import { useState } from "react";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  country: "",
  interest: "",
  message: "",
  website: "",
};

const productOptions = [
  "Roll Packed Mattress",
  "Pocket Spring Mattress",
  "Memory Foam Mattress",
  "Hybrid Mattress",
  "Compressed Sofa",
  "Sofa Bed",
  "OEM Custom Program",
];

export default function InquiryForm({ endpoint = "https://formsubmit.co/ajax/dzhou722@gmail.com" }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const validate = (nextValues = values) => {
    const nextErrors = {};
    if (!nextValues.name.trim()) nextErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextValues.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!/^\+?[0-9\s().-]{7,24}$/.test(nextValues.phone.trim())) {
      nextErrors.phone = "Please enter a valid phone number with country code if possible.";
    }
    return nextErrors;
  };

  const updateField = (event) => {
    const { name, value } = event.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);
    if (errors[name]) setErrors(validate(nextValues));
  };

  const submitInquiry = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (values.website) {
      setStatus({ type: "error", message: "Submission blocked. Please try again." });
      return;
    }

    if (Object.keys(nextErrors).length) {
      setStatus({ type: "error", message: "Please complete the required fields before submitting." });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const payload = {
        ...values,
        _subject: "New ANNAISI B2B Inquiry",
        _template: "table",
        _captcha: "false",
      };
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Submission failed");
      setValues(initialValues);
      setStatus({ type: "success", message: "Thank you. Your inquiry has been received. Our sales team will contact you soon." });
    } catch {
      setStatus({ type: "error", message: "Submission failed. Please email dzhou722@gmail.com or try again later." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="inquiry-form premium-form" onSubmit={submitInquiry} noValidate>
      <label>
        <span className="field-label">Name <span className="required-mark">Required</span></span>
        <input required name="name" value={values.name} onChange={updateField} autoComplete="name" placeholder="Your full name" aria-invalid={Boolean(errors.name)} />
        <span className="field-error">{errors.name}</span>
      </label>
      <label>
        <span className="field-label">Email <span className="required-mark">Required</span></span>
        <input required type="email" name="email" value={values.email} onChange={updateField} autoComplete="email" placeholder="name@company.com" aria-invalid={Boolean(errors.email)} />
        <span className="field-error">{errors.email}</span>
      </label>
      <label>
        <span className="field-label">Phone <span className="required-mark">Required</span></span>
        <input required type="tel" name="phone" value={values.phone} onChange={updateField} autoComplete="tel" inputMode="tel" placeholder="+1 555 123 4567" aria-invalid={Boolean(errors.phone)} />
        <span className="field-error">{errors.phone}</span>
      </label>
      <label>
        <span className="field-label">Company Name</span>
        <input name="company" value={values.company} onChange={updateField} autoComplete="organization" placeholder="Your company or brand name" />
      </label>
      <label>
        <span className="field-label">Country / Region</span>
        <input name="country" value={values.country} onChange={updateField} autoComplete="country-name" placeholder="United States, Canada, UAE..." />
      </label>
      <label>
        <span className="field-label">Product Requirement</span>
        <select name="interest" value={values.interest} onChange={updateField}>
          <option value="">Select product interest</option>
          {productOptions.map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>
      <label className="full">
        <span className="field-label">Message</span>
        <textarea name="message" rows={5} value={values.message} onChange={updateField} placeholder="Tell us size, fabric, structure, order quantity, target market, packaging, and target price if available." />
        <span className="field-hint">Optional, but detailed requirements help us quote faster.</span>
      </label>
      <label className="hp-field">Website<input name="website" value={values.website} onChange={updateField} tabIndex={-1} autoComplete="off" /></label>
      <div className="form-actions full">
        <button className="button primary" type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Submit Inquiry"}</button>
        <p className="form-note">Required fields must be completed before submitting.</p>
      </div>
      {status.message ? <p className={`form-status is-visible ${status.type === "error" ? "is-error" : ""}`} role="status" aria-live="polite">{status.message}</p> : null}
    </form>
  );
}
