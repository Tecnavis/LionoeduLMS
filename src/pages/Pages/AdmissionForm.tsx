import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import { IRootState } from '../../store';
import Dropdown from '../../components/Dropdown';
import i18next from 'i18next';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconUser from '../../components/Icon/IconUser';
import IconMail from '../../components/Icon/IconMail';
import IconPhoneCall from '../../components/Icon/IconPhoneCall';
import IconPencil from '../../components/Icon/IconPencil';
import IconMessageDots from '../../components/Icon/IconMessageDots';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';

const AdmissionForm = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('AdmissionForm'));
    });
    const navigate = useNavigate();

    const submitForm = () => {
        navigate('/');
    };

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    const [flag, setFlag] = useState(themeConfig.locale);

    const [admissionDate, setAdmissionDate] = useState<any>(null);
    const [joiningDate, setJoiningDate] = useState<any>(null);
    const [dob, setDob] = useState<any>(null);
    const [rollNumber, setRollNumber] = useState('LE/IFD/00000');
    const [age, setAge] = useState<number | null>(null);

    useEffect(() => {
        if (dob) {
            const birthDate = new Date(dob);
            const ageDiff = Date.now() - birthDate.getTime();
            const ageDate = new Date(ageDiff);
            setAge(Math.abs(ageDate.getUTCFullYear() - 1970));
        }
    }, [dob]);

    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20">
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Admission Form</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Please fill in your details to apply for admission.</p>
                            </div>
                            <form className="space-y-5" onSubmit={submitForm}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="admissionDate">Admission Date</label>
                                        <Flatpickr
                                            value={admissionDate}
                                            options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                                            className="form-input"
                                            onChange={(date) => setAdmissionDate(date)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="joiningDate">Joining Date</label>
                                        <Flatpickr
                                            value={joiningDate}
                                            options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                                            className="form-input"
                                            onChange={(date) => setJoiningDate(date)}
                                        />
                                    </div>
                                </div>
                                <div className="relative text-white-dark">
                                    <input
                                        id="rollNumber"
                                        type="text"
                                        value={rollNumber}
                                        onChange={(e) => setRollNumber(e.target.value)}
                                        placeholder="Roll Number"
                                        className="form-input ps-10 placeholder:text-white-dark"
                                    />
                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                        <IconPencil fill={true} />
                                    </span>
                                </div>
                                <div>
                                    <label htmlFor="studentPhoto">Upload Student Photo</label>
                                    <input
                                        id="studentPhoto"
                                        type="file"
                                        className="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
                                        required
                                    />
                                </div>
                                <div className="relative text-white-dark">
                                    <input id="Name" type="text" placeholder="Full Name" className="form-input ps-10 placeholder:text-white-dark" />
                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                        <IconUser fill={true} />
                                    </span>
                                </div>
                                <div className="relative text-white-dark">
                                    <input id="Address" type="text" placeholder="Address" className="form-input ps-10 placeholder:text-white-dark" />
                                </div>
                                <div className="relative text-white-dark">
                                    <input id="State" type="text" placeholder="State" className="form-input ps-10 placeholder:text-white-dark" />
                                </div>
                                <div className="relative text-white-dark">
                                    <input id="Pincode" type="text" placeholder="Pincode" className="form-input ps-10 placeholder:text-white-dark" />
                                </div>
                                <div className="relative text-white-dark">
                                    <input id="BloodGroup" type="text" placeholder="Blood Group" className="form-input ps-10 placeholder:text-white-dark" />
                                </div>
                                <div className="relative text-white-dark">
                                    <input id="GuardianName" type="text" placeholder="Guardian Name" className="form-input ps-10 placeholder:text-white-dark" />
                                </div>
                                <div className="relative text-white-dark">
                                    <input id="GuardianRelation" type="text" placeholder="Guardian Relation" className="form-input ps-10 placeholder:text-white-dark" />
                                </div>
                                <div>
                                    <label htmlFor="dob">Date of Birth</label>
                                    <Flatpickr
                                        value={dob}
                                        options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                                        className="form-input"
                                        onChange={(date) => setDob(date)}
                                    />
                                </div>
                                <div className="relative text-white-dark">
                                    <input id="Age" type="text" value={age || ''} placeholder="Age" className="form-input ps-10 placeholder:text-white-dark" readOnly />
                                </div>
                                <div className="inline-flex items-center">
                                    <label>Gender</label>
                                    <div className="inline-flex items-center ms-4">
                                        <input type="radio" id="male" name="gender" value="male" className="form-radio outline-primary rounded-full" />
                                        <label htmlFor="male" className="ml-2">Male</label>
                                    </div>
                                    <div className="inline-flex items-center ml-4">
                                        <input type="radio" id="female" name="gender" value="female" className="form-radio outline-primary rounded-full" />
                                        <label htmlFor="female" className="ml-2">Female</label>
                                    </div>
                                </div>
                                <div className="inline-flex items-center">
                                    <label>Martial Status</label>
                                    <div className="inline-flex items-center ms-4">
                                        <input type="radio" id="single" name="single" value="single" className="form-radio outline-primary rounded-full" />
                                        <label htmlFor="single" className="ml-2">Single</label>
                                    </div>
                                    <div className="inline-flex items-center ml-4">
                                        <input type="radio" id="married" name="married" value="married" className="form-radio outline-primary rounded-full" />
                                        <label htmlFor="married" className="ml-2">Married</label>
                                    </div>
                                </div>
                                <div className="relative text-white-dark">
                                    <input id="AcademicQualification" type="text" placeholder="Academic Qualification" className="form-input ps-10 placeholder:text-white-dark" />
                                </div>
                                <div className="relative text-white-dark">
                                    <input id="Mobile" type="text" placeholder="Mobile Number" className="form-input ps-10 placeholder:text-white-dark" />
                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                        <IconPhoneCall fill={true} />
                                    </span>
                                </div>
                                <div className="relative text-white-dark">
                                    <input id="ParentsMobile" type="text" placeholder="Parents Mobile Number" className="form-input ps-10 placeholder:text-white-dark" />
                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                        <IconPhoneCall fill={true} />
                                    </span>
                                </div>
                                <div className="relative text-white-dark">
                                    <input id="Email" type="email" placeholder="Email" className="form-input ps-10 placeholder:text-white-dark" />
                                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                        <IconMail fill={true} />
                                    </span>
                                </div>
                                <div className="relative text-white-dark">
                                    <input id="CourseName" type="text" placeholder="Course Name" className="form-input ps-10 placeholder:text-white-dark" />
                                </div>
                                <div className="relative text-white-dark">
                                    <input id="CourseFee" type="text" placeholder="Course Fee" className="form-input ps-10 placeholder:text-white-dark" />
                                </div>
                                <div>
                                    <label htmlFor="studentSignature">Upload Student Signature</label>
                                    <input
                                        id="studentSignature"
                                        type="file"
                                        className="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="guardianSignature">Upload Guardian Signature</label>
                                    <input
                                        id="guardianSignature"
                                        type="file"
                                        className="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdmissionForm;
