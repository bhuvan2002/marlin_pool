import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import './NewMemberRegistration.css';

const NewMemberRegistration = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    schoolOrCompany: Yup.string().required('School/Company Name is required'),
    city: Yup.string().required('City is required'),
    area: Yup.string().required('Area is required'),
    state: Yup.string().required('State is required'),
    pincode: Yup.string()
      .required('Pincode is required')
      .matches(/^[0-9]{6}$/, 'Invalid pincode'),
    parentOrGuardian: Yup.string().required('Parent/Guardian Name is required'),
    coachingMembership: Yup.string().required('Coaching or Membership is required'),
    contact: Yup.string()
      .required('Contact is required')
      .matches(/^[0-9]{10}$/, 'Invalid contact number'),
    address: Yup.string().required('Address is required'),
    aadharUpload: Yup.mixed().required('Aadhar upload is required'),
    photoUpload: Yup.mixed().required('Photo upload is required'),
    packageType: Yup.string().required('Package type is required'),
    packageStartDate: Yup.date().required('Package start date is required'),
    packageActualStartDate: Yup.date().required('Package actual start date is required'),
    packageEndDate: Yup.date().required('Package end date is required'),
    amount: Yup.number()
      .required('Amount is required')
      .min(1, 'Amount must be greater than 0'),
    discount: Yup.number()
      .min(0, 'Discount must be positive')
      .max(100, 'Discount cannot exceed 100%'),
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
      console.log('Form Values:', values);
      toast.success('Form submitted successfully!');
    },
  });

  const handleSendOtp = () => {
    if (formik.values.contact.length === 10) {
      toast.success(`OTP sent to +91${formik.values.contact}`, { autoClose: 2000 });
      setOtpSent(true);
    } else {
      toast.error('Please enter a valid 10-digit phone number.', { autoClose: 2000 });
    }
  };

  const handleVerifyOtp = () => {
    if (otp === '123456') {
      toast.success('OTP verified successfully!', { autoClose: 2000 });
    } else {
      toast.error('Invalid OTP. Please try again.', { autoClose: 2000 });
    }
  };

  useEffect(() => {
    const amount = parseFloat(formik.values.amount);
    const discount = parseFloat(formik.values.discount);
    if (!isNaN(amount) && !isNaN(discount)) {
      const discounted = amount - (amount * discount) / 100;
      formik.setFieldValue('discountedAmount', discounted.toFixed(2));
      formik.setFieldValue('roundedAmount', Math.round(discounted));
    } else {
      formik.setFieldValue('discountedAmount', '');
      formik.setFieldValue('roundedAmount', '');
    }
  }, [formik.values.amount, formik.values.discount]);

  return (
    <div className="registration-container">
      <h2 className="h2name">Member Registration</h2>
      <form onSubmit={formik.handleSubmit} className="registration-form">
        <div className="section">
          <h3>Personal Information</h3>
          <div className="inline-form-group">
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <select name="title" id="title" {...formik.getFieldProps('title')}>
                <option value="">Select Title</option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
              </select>
              {formik.touched.title && formik.errors.title && <div className="error">{formik.errors.title}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input type="text" id="firstName" {...formik.getFieldProps('firstName')} />
              {formik.touched.firstName && formik.errors.firstName && <div className="error">{formik.errors.firstName}</div>}
            </div>
          </div>

          {['lastName', 'schoolOrCompany', 'city', 'area', 'pincode', 'parentOrGuardian', 'coachingMembership'].map((field) => (
            <div className="form-group" key={field}>
              <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}:</label>
              <input type="text" id={field} {...formik.getFieldProps(field)} />
              {formik.touched[field] && formik.errors[field] && <div className="error">{formik.errors[field]}</div>}
            </div>
          ))}

          <div className="form-group">
            <label htmlFor="contact">Contact:</label>
            <input type="text" id="contact" {...formik.getFieldProps('contact')} />
            <button type="button" onClick={handleSendOtp} className="send-btn">Send OTP</button>
            {formik.touched.contact && formik.errors.contact && <div className="error">{formik.errors.contact}</div>}
          </div>

          {otpSent && (
            <div className="form-group">
              <label htmlFor="otp">OTP:</label>
              <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
              <button type="button" onClick={handleVerifyOtp} className="otp-btn-verify">Verify OTP</button>
            </div>
          )}
        </div>

        <div className="section">
          <h3>Address & Uploads</h3>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <textarea id="address" {...formik.getFieldProps('address')} />
            {formik.touched.address && formik.errors.address && <div className="error">{formik.errors.address}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="aadharUpload">Aadhar Upload:</label>
            <input type="file" id="aadharUpload" {...formik.getFieldProps('aadharUpload')} />
            {formik.touched.aadharUpload && formik.errors.aadharUpload && <div className="error">{formik.errors.aadharUpload}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="photoUpload">Photo Upload:</label>
            <input type="file" id="photoUpload" {...formik.getFieldProps('photoUpload')} />
            {formik.touched.photoUpload && formik.errors.photoUpload && <div className="error">{formik.errors.photoUpload}</div>}
          </div>
        </div>

        <div className="section">
          <h3>Package & Payment Information</h3>
          {['packageType', 'packageStartDate', 'packageActualStartDate', 'packageEndDate', 'amount', 'discount', 'paymentType', 'paymentStatus'].map((field) => (
            <div className="form-group" key={field}>
              <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}:</label>
              <input type={field.includes('Date') ? 'date' : 'text'} id={field} {...formik.getFieldProps(field)} />
              {formik.touched[field] && formik.errors[field] && <div className="error">{formik.errors[field]}</div>}
            </div>
          ))}
        </div>

        <div className="button-container">
          <button type="submit" className="submit-btn">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default NewMemberRegistration;
