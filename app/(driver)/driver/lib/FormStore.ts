// ─────────────────────────────────────────
//  FormStore — Onboarding multi-step state
// ─────────────────────────────────────────

type Step1Data = {
    profilePic: string;
    name:   string;
    dob:        string;
    email:      string;
    phone:      string;
    city:       string;
};

type Step2Data = {
    aadhaarFrontPic: string;
    aadhaarBackPic:  string;
};

type Step3Data = {
    licensePic:    string;
    licenseNumber: string;
    licenseExpiry: string;
};

type AllSteps = Partial<Step1Data & Step2Data & Step3Data>;

let _step1: Partial<Step1Data> = {};
let _step2: Partial<Step2Data> = {};
let _step3: Partial<Step3Data> = {};

export const saveStep1 = (data: Partial<Step1Data>) => { _step1 = { ..._step1, ...data }; };
export const saveStep2 = (data: Partial<Step2Data>) => { _step2 = { ..._step2, ...data }; };
export const saveStep3 = (data: Partial<Step3Data>) => { _step3 = { ..._step3, ...data }; };

export const loadStep1 = (): Partial<Step1Data> => ({ ..._step1 });
export const loadStep2 = (): Partial<Step2Data> => ({ ..._step2 });
export const loadStep3 = (): Partial<Step3Data> => ({ ..._step3 });

export const collectAll = (): AllSteps => ({ ..._step1, ..._step2, ..._step3 });
export const clearAll   = () => { _step1 = {}; _step2 = {}; _step3 = {}; };