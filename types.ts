export interface MagazineIssue {
  id: string;
  date: string;
  coverUrl?: string;
  pages?: string[];
}

export interface AdPackage {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface Magazine {
  id: string;
  name: string;
  category: string;
  description: string;
  thumbnailUrl: string;
  mediaKitUrl: string;
  issues: MagazineIssue[];
  packages: AdPackage[];
}

export interface BookingData {
  category: string | null;
  magazine: Magazine | null;
  adPackages: AdPackage[];
  fullName: string;
  companyName: string;

  brandName: string;
  contactNumber: string;
  email: string;
  creativeFile: File | null;
  brandKitFile: File | null;
  needsDesignSupport: boolean;
}