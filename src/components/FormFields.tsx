import type { ChangeEvent, ReactNode } from "react";
import clsx from "clsx";

const fieldBase =
  "w-full rounded-xl border border-cream/15 bg-ink/60 px-4 py-3 text-sm text-cream placeholder:text-titanium/60 transition-colors duration-300 focus:border-gold focus:outline-none";

type FieldWrapperProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
};

export function FieldWrapper({ label, htmlFor, required, error, children }: FieldWrapperProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-cream/90">
        {label}
        {required && <span className="ml-1 text-gold-bright">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-[#e08a6b]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  type?: "text" | "tel" | "number";
  min?: number;
  max?: number;
};

export function TextField({ id, label, value, onChange, placeholder, required, error, type = "text", min, max }: TextFieldProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }
  return (
    <FieldWrapper label={label} htmlFor={id} required={required} error={error}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        min={min}
        max={max}
        required={required}
        aria-invalid={!!error}
        className={clsx(fieldBase, error && "border-[#e08a6b]/70")}
      />
    </FieldWrapper>
  );
}

export function TextAreaField({
  id,
  label,
  value,
  onChange,
  placeholder,
  required,
  error,
}: Omit<TextFieldProps, "type" | "min" | "max">) {
  return (
    <FieldWrapper label={label} htmlFor={id} required={required} error={error}>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        aria-invalid={!!error}
        className={clsx(fieldBase, "resize-none", error && "border-[#e08a6b]/70")}
      />
    </FieldWrapper>
  );
}

type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  required?: boolean;
  error?: string;
};

export function SelectField({ id, label, value, onChange, options, placeholder, required, error }: SelectFieldProps) {
  return (
    <FieldWrapper label={label} htmlFor={id} required={required} error={error}>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        aria-invalid={!!error}
        className={clsx(fieldBase, "appearance-none", !value && "text-titanium/60", error && "border-[#e08a6b]/70")}
      >
        <option value="" disabled>
          {placeholder ?? "Selecciona una opción"}
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-charcoal text-cream">
            {option}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}

type RadioPillGroupProps = {
  legend: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
  error?: string;
};

export function RadioPillGroup({ legend, name, value, onChange, options, required, error }: RadioPillGroupProps) {
  return (
    <fieldset>
      <legend className="mb-2.5 text-sm font-medium text-cream/90">
        {legend}
        {required && <span className="ml-1 text-gold-bright">*</span>}
      </legend>
      <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label={legend}>
        {options.map((option) => {
          const active = value === option;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(option)}
              className={clsx(
                "focus-gold rounded-full border px-4 py-2 text-sm transition-all duration-250",
                active
                  ? "border-gold bg-gold text-ink font-medium shadow-[0_4px_20px_-6px_rgba(200,164,93,0.6)]"
                  : "border-cream/15 text-cream/80 hover:border-gold/50"
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
      <input type="hidden" name={name} value={value} />
      {error && (
        <p className="mt-1.5 text-xs text-[#e08a6b]" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
