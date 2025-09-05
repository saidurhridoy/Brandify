import React, { useState, useMemo } from 'react';
import { Magazine, AdPackage, BookingData } from '../types';
import { CATEGORIES, MAGAZINES } from '../constants';
import CategoryChip from '../components/CategoryChip';

interface BookingPageProps {
  initialMagazine: Magazine | null;
  onBookingComplete: (data: BookingData) => void;
  onCancel: () => void;
}

const initialBookingData: BookingData = {
  category: null,
  magazine: null,
  adPackages: [],
  fullName: '',
  companyName: '',
  brandName: '',
  contactNumber: '',
  email: '',
  creativeFile: null,
  brandKitFile: null,
  needsDesignSupport: false,
};

const ProgressIndicator: React.FC<{ currentStep: number }> = ({ currentStep }) => {
    const steps = ['Category', 'Magazine & Package', 'Brand Details', 'Review'];
    return (
        <div className="flex items-center justify-center mb-12">
            {steps.map((step, index) => (
                <React.Fragment key={step}>
                    <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${currentStep > index ? 'bg-brand-secondary' : 'bg-brand-primary'}`}>
                            {currentStep > index ? '✓' : index + 1}
                        </div>
                        <p className={`ml-2 font-semibold ${currentStep >= index ? 'text-brand-primary' : 'text-gray-500'}`}>{step}</p>
                    </div>
                    {index < steps.length - 1 && <div className={`flex-auto border-t-2 mx-4 ${currentStep > index ? 'border-brand-secondary' : 'border-gray-300'}`}></div>}
                </React.Fragment>
            ))}
        </div>
    );
}

const BookingPage: React.FC<BookingPageProps> = ({ initialMagazine, onBookingComplete, onCancel }) => {
  const [step, setStep] = useState(initialMagazine ? 2 : 1);
  const [bookingData, setBookingData] = useState<BookingData>({
    ...initialBookingData,
    magazine: initialMagazine,
    category: initialMagazine?.category || null,
  });

  const availableMagazines = useMemo(() => {
    if (!bookingData.category) return MAGAZINES;
    return MAGAZINES.filter(m => m.category === bookingData.category);
  }, [bookingData.category]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if(e.target.files && e.target.files.length > 0) {
          setBookingData(prev => ({...prev, creativeFile: e.target.files![0]}));
      }
  };

  const handleBrandKitFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if(e.target.files && e.target.files.length > 0) {
          setBookingData(prev => ({...prev, brandKitFile: e.target.files![0]}));
      }
  };

  const handlePackageSelect = (selectedPackage: AdPackage) => {
    setBookingData(prev => {
      const isAlreadySelected = prev.adPackages.some(p => p.id === selectedPackage.id);
      if (isAlreadySelected) {
        return { ...prev, adPackages: prev.adPackages.filter(p => p.id !== selectedPackage.id) };
      } else {
        return { ...prev, adPackages: [...prev.adPackages, selectedPackage] };
      }
    });
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);
  
  const renderStep = () => {
    switch (step) {
      case 1: // Choose Category
        return (
          <div>
            <h2 className="text-2xl font-bold text-center mb-8">Step 1: Choose Your Brand Category</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {CATEGORIES.map(cat => (
                <CategoryChip
                  key={cat}
                  category={cat}
                  isSelected={bookingData.category === cat}
                  onClick={() => {
                    setBookingData(prev => ({ ...prev, category: cat, magazine: null, adPackages: [] }));
                    nextStep();
                  }}
                />
              ))}
            </div>
          </div>
        );
      case 2: // Select Magazine & Package
        return (
          <div>
            <h2 className="text-2xl font-bold text-center mb-8">Step 2: Select Magazine & Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Magazines in '{bookingData.category}'</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {availableMagazines.map(mag => (
                    <div
                      key={mag.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${bookingData.magazine?.id === mag.id ? 'border-brand-primary bg-blue-50 shadow-md' : 'border-gray-300 hover:bg-gray-100'}`}
                      onClick={() => setBookingData(prev => ({...prev, magazine: mag, adPackages: []}))}
                    >
                      <h4 className="font-bold">{mag.name}</h4>
                      <p className="text-sm text-gray-600 truncate">{mag.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Available Packages (Select one or more)</h3>
                {bookingData.magazine ? (
                  <div className="space-y-3">
                    {bookingData.magazine.packages.map(pkg => {
                      const isSelected = bookingData.adPackages.some(p => p.id === pkg.id);
                      return (
                      <div
                        key={pkg.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${isSelected ? 'ring-2 ring-brand-primary bg-blue-50' : 'border-gray-300 hover:bg-gray-100'}`}
                        onClick={() => handlePackageSelect(pkg)}
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold">{pkg.name}</h4>
                          <span className="font-semibold text-brand-secondary">${pkg.price}</span>
                        </div>
                        <p className="text-sm text-gray-600">{pkg.description}</p>
                      </div>
                    )})}
                  </div>
                ) : <p className="text-gray-500">Please select a magazine first.</p>}
              </div>
            </div>
          </div>
        );
      case 3: // Brand Submission Form
        return (
          <div>
            <h2 className="text-2xl font-bold text-center mb-8">Step 3: Provide Brand Details</h2>
            <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="fullName" placeholder="Full Name" value={bookingData.fullName} onChange={handleInputChange} className="p-3 border rounded-md col-span-2" />
              <input name="companyName" placeholder="Company Name" value={bookingData.companyName} onChange={handleInputChange} className="p-3 border rounded-md" />
              <input name="brandName" placeholder="Brand Name" value={bookingData.brandName} onChange={handleInputChange} className="p-3 border rounded-md" />
              <input name="contactNumber" placeholder="Contact Number" value={bookingData.contactNumber} onChange={handleInputChange} className="p-3 border rounded-md" />
              <input name="email" placeholder="Email Address" type="email" value={bookingData.email} onChange={handleInputChange} className="p-3 border rounded-md" />
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Creative File</label>
                <input type="file" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-primary hover:file:bg-blue-100"/>
              </div>
               <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Brand Kit (.zip, .pdf)</label>
                <input type="file" onChange={handleBrandKitFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-primary hover:file:bg-blue-100"/>
              </div>
              <div className="col-span-2 flex items-center">
                 <input type="checkbox" id="designSupport" checked={bookingData.needsDesignSupport} onChange={e => setBookingData(prev => ({...prev, needsDesignSupport: e.target.checked}))} className="h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary"/>
                 <label htmlFor="designSupport" className="ml-2 block text-sm text-gray-900">Request Design Support (additional fees may apply)</label>
              </div>
            </div>
          </div>
        );
      case 4: // Review
        const totalCost = bookingData.adPackages.reduce((sum, pkg) => sum + pkg.price, 0);
        return (
          <div>
            <h2 className="text-2xl font-bold text-center mb-8">Step 4: Review & Submit</h2>
            <div className="max-w-2xl mx-auto bg-gray-100 p-6 rounded-lg shadow-inner space-y-4">
               <div><strong className="text-gray-700">Magazine:</strong> {bookingData.magazine?.name}</div>
                <div>
                  <strong className="text-gray-700">Selected Packages:</strong>
                  {bookingData.adPackages.length > 0 ? (
                    <ul className="list-disc list-inside ml-4 mt-1">
                      {bookingData.adPackages.map(p => <li key={p.id}>{p.name} (${p.price})</li>)}
                    </ul>
                  ) : (<span className="ml-2">None</span>)}
                </div>
               <div className="text-xl font-bold text-right border-t pt-4 mt-4"><strong className="text-gray-700 float-left">Total:</strong> ${totalCost}</div>
               <hr/>
               <h3 className="text-lg font-semibold pt-4">Your Details:</h3>
               <div><strong className="text-gray-700">Full Name:</strong> {bookingData.fullName}</div>
               <div><strong className="text-gray-700">Company:</strong> {bookingData.companyName}</div>
               <div><strong className="text-gray-700">Brand:</strong> {bookingData.brandName}</div>
               <div><strong className="text-gray-700">Email:</strong> {bookingData.email}</div>
               <div><strong className="text-gray-700">Creative File:</strong> {bookingData.creativeFile?.name || 'None'}</div>
               <div><strong className="text-gray-700">Brand Kit:</strong> {bookingData.brandKitFile?.name || 'None'}</div>
               <div><strong className="text-gray-700">Design Support:</strong> {bookingData.needsDesignSupport ? 'Requested' : 'No'}</div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const isNextDisabled = () => {
      if(step === 2 && (!bookingData.magazine || bookingData.adPackages.length === 0)) return true;
      if(step === 3 && (!bookingData.fullName || !bookingData.email)) return true;
      return false;
  }

  return (
    <div className="bg-white p-6 sm:p-10 rounded-lg shadow-xl max-w-5xl mx-auto">
      <ProgressIndicator currentStep={step} />
      {renderStep()}
      <div className="mt-12 flex justify-between items-center">
        {step > 1 ? (
          <button onClick={prevStep} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100">Back</button>
        ) : <button onClick={onCancel} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100">Cancel</button>}
        
        {step < 4 ? (
          <button onClick={nextStep} disabled={isNextDisabled()} className="px-6 py-2 bg-brand-primary text-white rounded-md hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed">Next</button>
        ) : (
          <button onClick={() => onBookingComplete(bookingData)} className="px-6 py-2 bg-brand-secondary text-white font-bold rounded-md hover:bg-green-600">Submit Booking</button>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
