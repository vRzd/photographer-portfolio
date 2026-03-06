'use client';

import { useState } from 'react';

const sessionTypes = [
  'Wedding',
  'Portrait',
  'Couples',
  'Family',
  'Event',
  'Lifestyle',
  'Other',
];

export default function ContactForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    sessionType: '',
    date: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Valid email required';
    if (!form.message.trim()) e.message = 'Required';
    return e;
  };

  const onChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus('sending');
    // Simulate async form submission — replace with real email service (Resend, SendGrid, etc.)
    await new Promise((r) => setTimeout(r, 1200));
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 border border-gold rounded-full mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="text-gold">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-heading text-3xl italic text-foreground mb-3">
          Message Received
        </h3>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
          Thank you for reaching out. I&apos;ll be in touch within 24&ndash;48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field
          label="First Name"
          required
          error={errors.firstName}
        >
          <input
            type="text"
            value={form.firstName}
            onChange={onChange('firstName')}
            placeholder="Alina"
            className={inputClass(errors.firstName)}
          />
        </Field>
        <Field
          label="Last Name"
          required
          error={errors.lastName}
        >
          <input
            type="text"
            value={form.lastName}
            onChange={onChange('lastName')}
            placeholder="Smith"
            className={inputClass(errors.lastName)}
          />
        </Field>
      </div>

      {/* Contact row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="Email Address" required error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={onChange('email')}
            placeholder="your@email.com"
            className={inputClass(errors.email)}
          />
        </Field>
        <Field label="Phone Number">
          <input
            type="tel"
            value={form.phone}
            onChange={onChange('phone')}
            placeholder="+1 (416) 000-0000"
            className={inputClass()}
          />
        </Field>
      </div>

      {/* Session details row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="Session Type">
          <select
            value={form.sessionType}
            onChange={onChange('sessionType')}
            className={inputClass()}
          >
            <option value="">Select a type...</option>
            {sessionTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Preferred Date">
          <input
            type="date"
            value={form.date}
            onChange={onChange('date')}
            className={inputClass()}
          />
        </Field>
      </div>

      {/* Message */}
      <Field label="Tell me about your vision" required error={errors.message}>
        <textarea
          value={form.message}
          onChange={onChange('message')}
          rows={5}
          placeholder="Share details about your session, location preferences, style, or any questions you have..."
          className={`${inputClass(errors.message)} resize-none`}
        />
      </Field>

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full sm:w-auto px-10 py-4 bg-foreground text-background text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  );
}

function Field({ label, required, error, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

function inputClass(hasError) {
  return [
    'w-full bg-transparent border-b py-3 text-sm text-foreground placeholder:text-muted-foreground/50',
    'focus:outline-none transition-colors duration-200',
    hasError
      ? 'border-red-400/60 focus:border-red-400'
      : 'border-border focus:border-gold',
  ].join(' ');
}
