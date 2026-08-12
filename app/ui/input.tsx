'use client';

export function Input(
    { name, step = "1", value, onChangeCallback, describedBy, label, placeholder } :
    {name: string, step?: string, value: string, onChangeCallback: any, describedBy: string, label: string, placeholder: string}

) {
    return (
        <div className="w-full rounded-xl border border-zinc-100 bg-white px-4 py-3
            text-sm text-zinc-900 placeholder:text-zinc-400 shadow-[0_1px_3px_rgba(15,23,42,0.08)]
            outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
            <label htmlFor={name} className="mb-1 block text-xs font-medium text-black-500">{label}</label>
            <input
                id={name}
                name={name}
                type="number"
                step={step}
                className="w-full bg-transparent outline-none"
                placeholder={placeholder}
                aria-describedby={describedBy}
                value={value}
                onChange={(e) => {
                    onChangeCallback(e.target.value);
                }}
            />
        </div>
    );
}

export function InputErrorMessage({ id, errorsProperty }: { id: string, errorsProperty: any }) {
    return <div id={id} aria-live="polite" aria-atomic="true">
        {
            errorsProperty
            && errorsProperty.errors.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                </p>
            ))
        }
    </div>
}
