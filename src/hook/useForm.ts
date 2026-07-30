import { ChangeEvent, useState } from "react"

export const useForm = <T extends Record<string, any>>(initialState: T) => {
    const [form, setForm] = useState<T>(initialState);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "number" ? (value === "" ? 0 : Number(value)) : value,
        }));
    };

    const setFieldValue = (name: keyof T, value: any) => {
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const resetForm = () => setForm(initialState);

    return { form, setForm, handleChange, setFieldValue, resetForm };
}