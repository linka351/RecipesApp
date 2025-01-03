import React, { forwardRef, useImperativeHandle, useRef } from "react";
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
			<Input type='file' name='image' onChange={onChange} ref={fileInputRef} />
		);
	}
);

export default ImageUploader;
