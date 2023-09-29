"use client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useState } from "react";
import { FormInput } from "../molecules/FormInput";

interface ReviewFormProps {
	handleReviews: (review: CommentFormData) => void;
}

const schema = yup
	.object({
		name: yup.string().required(),
		headline: yup.string().required(),
		email: yup.string().email().required(),
		content: yup.string().required(),
		rating: yup.number().required(),
	})
	.required();

export type CommentFormData = yup.InferType<typeof schema>;

export const ReviewForm = ({ handleReviews }: ReviewFormProps) => {
	const [isSuccessInfo, setSuccessInfo] = useState<boolean>(false);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitSuccessful },
		reset,
	} = useForm<CommentFormData>();

	const onSubmit = async (data: CommentFormData) => {
		handleReviews(data);
	};

	if (isSubmitSuccessful) {
		setSuccessInfo(true);
		reset();
	}

	return (
		<div>
			{isSuccessInfo && (
				<p className="pb-4 text-center text-pink-600">
					Komentarz został dodany !!{" "}
				</p>
			)}
			<form
				onSubmit={handleSubmit(onSubmit)}
				data-testid="add-review-form"
			>
				<div className="flex w-full flex-col ">
					<div className="col-span-3 mb-2">
						<FormInput
							label="Tytuł"
							type="text"
							register={{ ...register("headline") }}
							name="headline"
							errors={errors}
						/>
					</div>
					<div className="col-span-3 mb-2">
						<FormInput
							label="Name"
							type="text"
							register={{ ...register("name") }}
							name="name"
							errors={errors}
						/>
					</div>
					<div className="col-span-3 mb-2">
						<FormInput
							label="Email"
							type="email"
							register={{ ...register("email") }}
							name="email"
							errors={errors}
						/>
					</div>
					<div className="col-span-3 mb-2">
						<FormInput
							label="Rating"
							type="number"
							register={{ ...register("rating") }}
							name="rating"
							errors={errors}
						/>
					</div>
					<div className="col-span-3">
						<p className="block text-xs font-medium text-gray-700">
							Komentarz
						</p>
						<textarea
							id="content"
							{...register("content")}
							className="w-full border-gray-200 text-gray-500 focus:outline-none"
						/>
					</div>
				</div>

				<div className="col-span-6 mt-4">
					<button
						type="submit"
						className="block w-full rounded-md bg-black p-2.5 text-sm text-white transition hover:shadow-lg"
					>
						Wyślij
					</button>
				</div>
			</form>
		</div>
	);
};
