import React, { forwardRef, useImperativeHandle, useRef } from "react";
import "./imageUploader.scss";
import Input from "../../../../../../components/inputs/Input";
import Button from "../../../../../../components/buttons/Button";

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

		const handleClick = () => {
			if (fileInputRef.current) {
				fileInputRef.current.click();
			}
		};

		return (
			<div className='custom-file-uploader'>
				<Input
					id='fileInput'
					inputClassName='file-input'
					type='file'
					name='image'
					onChange={onChange}
					ref={fileInputRef}
				/>

				<Button className='custom-button-label' onClick={handleClick}>
					{" "}
					Dodaj Zdjęcie{" "}
				</Button>
			</div>
		);
	}
);

export default ImageUploader;
