import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import './NewMemberRegistration.css';

const MultiStepRegistration = () => {
  const [activeTab, setActiveTab] = useState(0);

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    schoolOrCompany: Yup.string().required('School/Company Name is required'),
    city: Yup.string().required('City is required'),
    area: Yup.string().required('Area is required'),
    state: Yup.string().required('State is required'),
    pincode: Yup.string().required('Pincode is required').matches(/^[0-9]{6}$/, 'Invalid pincode'),
    parentOrGuardian: Yup.string().required('Parent/Guardian Name is required'),
    coachingMembership: Yup.string().required('Coaching or Membership is required'),
    contact: Yup.string().required('Contact is required').matches(/^[0-9]{10}$/, 'Invalid contact number'),
    address: Yup.string().required('Address is required'),
    aadharUpload: Yup.mixed().required('Aadhar upload is required'),
    photoUpload: Yup.mixed().required('Photo upload is required'),
    packageType: Yup.string().required('Package type is required'),
    packageStartDate: Yup.date().required('Package start date is required'),
    packageActualStartDate: Yup.date().required('Package actual start date is required'),
    packageEndDate: Yup.date().required('Package end date is required'),
    amount: Yup.number().required('Amount is required').min(1, 'Amount must be greater than 0'),
    discount: Yup.number().min(0, 'Discount must be positive').max(100, 'Discount cannot exceed 100%'),
    paymentType: Yup.string().required('Payment type is required'),
    paymentStatus: Yup.string().required('Payment status is required'),
    discountedAmount: Yup.number().min(0, 'Discounted amount must be positive'),
    roundedAmount: Yup.number().min(0, 'Rounded amount must be positive'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      firstName: '',
      lastName: '',
      schoolOrCompany: '',
      city: '',
      area: '',
      state: 'Karnataka',
      pincode: '',
      parentOrGuardian: '',
      coachingMembership: '',
      contact: '',
      address: '',
      aadharUpload: null,
      photoUpload: null,
      packageType: '',
      packageStartDate: '',
      packageActualStartDate: '',
      packageEndDate: '',
      amount: '',
      discount: '',
      discountedAmount: '',
      roundedAmount: '',
      paymentType: '',
      paymentStatus: '',
    },
    validationSchema,
    onSubmit: (values) => {
      try {
        const { aadharUpload, photoUpload, ...serializableData } = values;
        const storedData = localStorage.getItem('members') || '[]';
        const members = JSON.parse(storedData);
        const updatedMembers = [...members, serializableData];
        localStorage.setItem('members', JSON.stringify(updatedMembers));
        toast.success('Form submitted successfully and data stored locally!');
      } catch (error) {
        toast.error('Failed to store data locally.');
        console.error('LocalStorage error:', error);
      }
    },
  });

  useEffect(() => {
    const { amount, discount } = formik.values;
    if (amount && discount >= 0) {
      const discountedAmount = amount - (amount * discount) / 100;
      const roundedAmount = Math.round(discountedAmount);
      formik.setFieldValue('discountedAmount', discountedAmount);
      formik.setFieldValue('roundedAmount', roundedAmount);
    }
  }, [formik.values.amount, formik.values.discount, formik]);

  const requiredFieldsPerTab = [
    ['title', 'firstName', 'lastName', 'schoolOrCompany', 'city', 'area', 'state', 'pincode', 'parentOrGuardian', 'coachingMembership'],
    ['packageType', 'packageStartDate', 'packageActualStartDate', 'packageEndDate'],
    ['amount', 'discount', 'paymentType', 'paymentStatus']
  ];

  const handleNext = () => {
    const fieldsToValidate = requiredFieldsPerTab[activeTab];
    formik.setTouched(
      fieldsToValidate.reduce((acc, field) => ({ ...acc, [field]: true }), {}),
      true
    );

    if (fieldsToValidate.every(field => !formik.errors[field] && formik.values[field] !== '')) {
      if (activeTab < 2) {
        setActiveTab(activeTab + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  const tabHeaders = ["Personal Info", "Package Info", "Payment Info"];

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <div className="tab-content">
            <div className="form-group">
              <div className="label-input-wrapper">
                <label htmlFor="title">Name:</label>
                <div className="name-inputs">
                  <select
                    className="title-select"
                    name="title"
                    {...formik.getFieldProps('title')}
                  >
                    <option value="">Title</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                  </select>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="First Name"
                    {...formik.getFieldProps('firstName')}
                  />
                </div>
              </div>
              {formik.touched.title && formik.errors.title && (
                <div className="error">{formik.errors.title}</div>
              )}
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="error">{formik.errors.firstName}</div>
              )}
            </div>
            {[
              { label: "Last Name", type: "text", id: "lastName" },
              { label: "School/Company Name", type: "text", id: "schoolOrCompany" },
              { label: "City", type: "select", options: ["", "Bangalore", "Mysore"], id: "city" },
              { label: "Area", type: "select", options: ["", "Area 1", "Area 2"], id: "area" },
              { label: "State", type: "text", id: "state", value: "Karnataka", readOnly: true },
              { label: "Pincode", type: "text", id: "pincode" },
              { label: "Parent/Guardian Name", type: "text", id: "parentOrGuardian" },
              { label: "Coaching or Membership", type: "text", id: "coachingMembership" },
            ].map(({ label, type, options, id, ...rest }) => (
              <div className="form-group" key={id}>
                <div className="label-input-wrapper">
                  <label htmlFor={id}>{label}:</label>
                  {type === 'select' ? (
                    <select
                      name={id}
                      id={id}
                      {...formik.getFieldProps(id)}
                    >
                      {options.map((option, index) => (
                        <option key={index} value={option === "" ? "" : option}>
                          {option === "" ? `Select ${label}` : option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={type}
                      id={id}
                      {...formik.getFieldProps(id)}
                      readOnly={rest.readOnly}
                    />
                  )}
                </div>
                {formik.touched[id] && formik.errors[id] && (
                  <div className="error">{formik.errors[id]}</div>
                )}
              </div>
            ))}
            <div className="navigation-button">
              <button type="button" className="next-btn" onClick={handleNext}>Next</button>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="tab-content">
            {[
              { label: "Package Type", type: "select", options: ["", "Basic", "Standard", "Premium"], id: "packageType" },
              { label: "Package Start Date", type: "date", id: "packageStartDate" },
              { label: "Package Actual Start Date", type: "date", id: "packageActualStartDate" },
              { label: "Package End Date", type: "date", id: "packageEndDate" },
              { label: "Package Extended Date", type: "date", id: "packageExtendedDate" },
            ].map(({ label, type, options, id, ...rest }) => (
              <div className="form-group" key={id}>
                <div className="label-input-wrapper">
                  <label htmlFor={id}>{label}:</label>
                  {type === 'select' ? (
                    <select
                      name={id}
                      id={id}
                      {...formik.getFieldProps(id)}
                    >
                      {options.map((option, index) => (
                        <option key={index} value={option === "" ? "" : option}>
                          {option === "" ? `Select ${label}` : option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={type}
                      id={id}
                      {...formik.getFieldProps(id)}
                    />
                  )}
                </div>
                {formik.touched[id] && formik.errors[id] && (
                  <div className="error">{formik.errors[id]}</div>
                )}
              </div>
            ))}
            <div className="navigation-button">
              <button type="button" className="previous-btn" onClick={handlePrevious}>Previous</button>
              <button type="button" className="next-btn" onClick={handleNext}>Next</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="tab-content">
            {[
              { label: "Actual Amount (₹)", type: "number", id: "amount", required: true },
              { label: "Discount (%)", type: "number", id: "discount", required: true },
              { label: "Discounted Amount (₹)", type: "number", id: "discountedAmount", readOnly: true },
              { label: "Rounded Amount (₹)", type: "number", id: "roundedAmount", readOnly: true },
              { label: "Payment Type", type: "select", options: ["", "Cash", "Cheque", "UPI", "Card"], id: "paymentType", required: true },
              { label: "Payment Status", type: "select", options: ["", "Completed", "Pending"], id: "paymentStatus", required: true },
            ].map(({ label, type, options, id, required, readOnly }) => (
              <div className="form-group" key={id}>
                <div className="label-input-wrapper">
                  <label htmlFor={id}>{label}:</label>
                  {type === 'select' ? (
                    <select
                      name={id}
                      id={id}
                      {...formik.getFieldProps(id)}
                    >
                      {options.map((option, index) => (
                        <option key={index} value={option === "" ? "" : option}>
                          {option === "" ? `Select ${label}` : option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={type}
                      name={id}
                      id={id}
                      {...formik.getFieldProps(id)}
                      readOnly={readOnly}



                      required={required}
                    />
                  )}
                </div>
                {formik.touched[id] && formik.errors[id] && (
                  <div className="error">{formik.errors[id]}</div>
                )}
              </div>
            ))}
            <div className="submit-button">
              <button type="button" className="previous-btn" onClick={handlePrevious}>Previous</button>
              <button type="submit" className="save-btn">Save</button>
              <button type="button" className="schedule-btn">Schedule</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <h2 className="h2name">Member Registration</h2>
        <div className="tab-buttons">
          {tabHeaders.map((header, index) => (
            <button
              key={index}
              className={`tab-button ${activeTab === index ? 'active-tab' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {header}
            </button>
          ))}
        </div>
        <form onSubmit={formik.handleSubmit}>
          {renderTabContent()}
        </form>
      </div>
    </div>
  );
};

export default MultiStepRegistration;