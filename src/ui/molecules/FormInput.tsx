import {
	type UseFormRegisterReturn,
	type FieldErrors,
} from "react-hook-form";

interface Props {
	label: string;
	register: UseFormRegisterReturn;
	name: string;
	type: "text" | "email" | "number" | "tel";
	errors: FieldErrors;
}

export const FormInput = (props: Props) => {
	const { name, type, label, register, errors } = props;

	return (
		<>
			<label
				htmlFor={name}
				className="mb-2 block text-sm font-medium text-gray-700"
			>
				{label}
			</label>
			<input
				type={type}
				id={name}
				{...register}
				className="mb-2 mt-1 w-full text-gray-500   focus:border-none focus:border-transparent focus:outline-none focus:ring-0  sm:text-sm"
			/>
			<p className="text-xs text-red-400">
				{errors[name]?.message?.toString()}
			</p>
		</>
	);
};
