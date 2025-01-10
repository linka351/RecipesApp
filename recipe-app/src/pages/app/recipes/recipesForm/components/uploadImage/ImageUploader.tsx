import React, { forwardRef, useImperativeHandle, useRef } from "react";
import "./imageUploader.scss";
import Input from "../../../../../../components/inputs/Input";

interface ImageUploaderProps {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploader = forwardRef<{ clear: () => void }, ImageUploaderProps>(
	({ onChange }, ref) => {
		const fileInputRef = useRef<HTMLInputElement | null>(null);

		useImperativeHandle(ref, () => ({
			clear: () => {
				if (fileInputRef.current) {
					fileInputRef.current.value = "";
				}
			},
		}));

		return (
			<div className='custom-file-uploader'>
				<Input
					label='Dodaj zdjęcie'
					labelClassName='custom-file-label'
					id='fileInput'
					inputClassName='file-input'
					type='file'
					name='image'
					onChange={onChange}
					ref={fileInputRef}
				/>
			</div>
		);
	}
);

export default ImageUploader;
