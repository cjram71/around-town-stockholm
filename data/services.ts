export type CategoryId =
  | "banks"
  | "clinics"
  | "electricity"
  | "embassies"
  | "hospitals"
  | "immigration"
  | "internet"
  | "tax"
  | "libraries";

export type Category = {
  id: CategoryId;
  number: number;
  en: string;
  sv: string;
};

export type Service = {
  id: string;
  category: CategoryId;
  name: string;
  typeEn: string;
  typeSv: string;
  address: string;
  hoursEn: string;
  hoursSv: string;
  phone?: string;
  website: string;
  latitude?: number;
  longitude?: number;
  official?: boolean;
  online?: boolean;
};

export const categories: Category[] = [
  { id: "banks", number: 3, en: "Banks", sv: "Banker" },
  { id: "clinics", number: 4, en: "Clinics", sv: "Vårdcentraler" },
  { id: "electricity", number: 5, en: "Electric companies", sv: "Elbolag" },
  { id: "embassies", number: 6, en: "Embassies", sv: "Ambassader" },
  { id: "hospitals", number: 7, en: "Hospitals", sv: "Sjukhus" },
  { id: "immigration", number: 8, en: "Immigration", sv: "Migration" },
  { id: "internet", number: 9, en: "Internet companies", sv: "Internetbolag" },
  { id: "tax", number: 10, en: "Tax agency", sv: "Skatteverket" },
  { id: "libraries", number: 11, en: "Public libraries", sv: "Bibliotek" },
];

export const services: Service[] = [
  {
    id: "st-goran",
    category: "hospitals",
    name: "Capio S:t Görans Sjukhus",
    typeEn: "Emergency hospital",
    typeSv: "Akutsjukhus",
    address: "Sankt Göransplan 1, 112 19 Stockholm",
    hoursEn: "Emergency department: 24 hours",
    hoursSv: "Akutmottagning: öppet dygnet runt",
    phone: "08-587 010 00",
    website: "https://www.capio.se/hitta-mottagning/specialistvard/sjukhus/s:t-gorans-sjukhus/",
    latitude: 59.3343,
    longitude: 18.0305,
    official: true,
  },
  {
    id: "karolinska-solna",
    category: "hospitals",
    name: "Karolinska Universitetssjukhuset Solna",
    typeEn: "University hospital",
    typeSv: "Universitetssjukhus",
    address: "Eugeniavägen 3, 171 64 Solna",
    hoursEn: "Open 24 hours - services vary",
    hoursSv: "Öppet dygnet runt - verksamheter varierar",
    phone: "08-517 700 00",
    website: "https://www.karolinska.se/",
    latitude: 59.3516,
    longitude: 18.0323,
    official: true,
  },
  {
    id: "sodersjukhuset",
    category: "hospitals",
    name: "Södersjukhuset",
    typeEn: "Emergency hospital",
    typeSv: "Akutsjukhus",
    address: "Sjukhusbacken 10, 118 83 Stockholm",
    hoursEn: "Emergency department: 24 hours",
    hoursSv: "Akutmottagning: öppet dygnet runt",
    phone: "08-123 610 00",
    website: "https://www.sodersjukhuset.se/",
    latitude: 59.3083,
    longitude: 18.0572,
    official: true,
  },
  {
    id: "1177-care",
    category: "clinics",
    name: "1177 - Find healthcare",
    typeEn: "Official healthcare search",
    typeSv: "Officiell söktjänst för vård",
    address: "Online service for Stockholm County",
    hoursEn: "Website always available; phone advice 24 hours",
    hoursSv: "Webbplatsen är alltid tillgänglig; sjukvårdsrådgivning dygnet runt",
    phone: "1177",
    website: "https://www.1177.se/Stockholm/hitta-vard/",
    official: true,
    online: true,
  },
  {
    id: "city-library",
    category: "libraries",
    name: "Stockholms stadsbibliotek",
    typeEn: "Public library",
    typeSv: "Folkbibliotek",
    address: "Sveavägen 73, 113 80 Stockholm",
    hoursEn: "See official website for today's hours",
    hoursSv: "Se officiell webbplats för dagens öppettider",
    phone: "08-508 309 00",
    website: "https://biblioteket.stockholm.se/bibliotek/stadsbiblioteket",
    latitude: 59.3434,
    longitude: 18.0546,
    official: true,
  },
  {
    id: "culture-house-library",
    category: "libraries",
    name: "Kulturhuset Bibliotek",
    typeEn: "Public library",
    typeSv: "Folkbibliotek",
    address: "Sergels torg 3, 111 57 Stockholm",
    hoursEn: "See official website for today's hours",
    hoursSv: "Se officiell webbplats för dagens öppettider",
    website: "https://biblioteket.stockholm.se/",
    latitude: 59.3326,
    longitude: 18.0649,
    official: true,
  },
  {
    id: "us-embassy",
    category: "embassies",
    name: "Embassy of the United States",
    typeEn: "Embassy and consular services",
    typeSv: "Ambassad och konsulära tjänster",
    address: "Dag Hammarskjölds väg 31, 115 89 Stockholm",
    hoursEn: "Appointment may be required",
    hoursSv: "Tidsbokning kan krävas",
    website: "https://se.usembassy.gov/",
    latitude: 59.3338,
    longitude: 18.1002,
    official: true,
  },
  {
    id: "uk-embassy",
    category: "embassies",
    name: "British Embassy Stockholm",
    typeEn: "Embassy and consular services",
    typeSv: "Ambassad och konsulära tjänster",
    address: "Skarpögatan 6-8, 115 27 Stockholm",
    hoursEn: "Appointment may be required",
    hoursSv: "Tidsbokning kan krävas",
    website: "https://www.gov.uk/world/organisations/british-embassy-stockholm",
    latitude: 59.3409,
    longitude: 18.1058,
    official: true,
  },
  {
    id: "migration-visit",
    category: "immigration",
    name: "Migrationsverket - Visit us",
    typeEn: "Official office finder and appointments",
    typeSv: "Officiell kontorssökning och tidsbokning",
    address: "Choose the office based on your matter",
    hoursEn: "Check the official page before travelling",
    hoursSv: "Kontrollera den officiella sidan innan du reser",
    phone: "0771-235 235",
    website: "https://www.migrationsverket.se/en/contact-us/visit-us.html",
    official: true,
    online: true,
  },
  {
    id: "tax-service",
    category: "tax",
    name: "Skatteverket - Service offices",
    typeEn: "Tax, registration and ID-card services",
    typeSv: "Skatt, folkbokföring och id-kort",
    address: "Find the correct Stockholm service office online",
    hoursEn: "Opening hours vary by office",
    hoursSv: "Öppettider varierar mellan kontoren",
    phone: "0771-567 567",
    website: "https://www.skatteverket.se/omoss/kontaktaoss/besokservicekontor.html",
    official: true,
    online: true,
  },
  {
    id: "electricity-guide",
    category: "electricity",
    name: "Electricity providers and grid companies",
    typeEn: "Independent consumer guidance",
    typeSv: "Oberoende konsumentvägledning",
    address: "Online comparison and guidance",
    hoursEn: "Online service",
    hoursSv: "Onlinetjänst",
    website: "https://www.energimarknadsbyran.se/el/",
    official: true,
    online: true,
  },
  {
    id: "internet-guide",
    category: "internet",
    name: "Internet service guidance",
    typeEn: "Compare availability at your address",
    typeSv: "Jämför tillgänglighet på din adress",
    address: "Online service - availability depends on address",
    hoursEn: "Online service",
    hoursSv: "Onlinetjänst",
    website: "https://bredbandskartan.se/",
    official: true,
    online: true,
  },
  {
    id: "bank-guide",
    category: "banks",
    name: "Swedish Bankers' Association",
    typeEn: "Banking information for newcomers",
    typeSv: "Bankinformation för nyanlända",
    address: "Online guidance",
    hoursEn: "Online service",
    hoursSv: "Onlinetjänst",
    website: "https://www.swedishbankers.se/en-us/",
    official: true,
    online: true,
  },
];
