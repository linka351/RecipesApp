import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import "./imageUploader.scss";
import Input from "../../../../../../components/inputs/Input";
import Button from "../../../../../../components/buttons/Button";
import { IoCloudUploadOutline } from "react-icons/io5";

interface Props {
	previewUrl?: string;
	onChange: (file: File) => void;
}

const ImageUploader = forwardRef<{ clear: () => void }, Props>(
	({ previewUrl, onChange }, ref) => {
		const [previewImage, setPreviewImage] = useState<string | null>(null);

		const fileInputRef = useRef<HTMLInputElement | null>(null);

		useEffect(() => {
			setPreviewImage(previewUrl || null);
		}, [previewUrl]);

		useImperativeHandle(ref, () => ({
			clear: () => {
				if (fileInputRef.current) {
					fileInputRef.current.value = "";
				}
			},
		}));

		const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (file) {
				setPreviewImage(URL.createObjectURL(file));
				onChange?.(file);
			}
		};

		const handleClick = () => {
			if (fileInputRef.current) {
				fileInputRef.current.click();
			}
		};

		return (
			<>
				{previewImage ? (
					<div>
						<img className='image' src={previewImage} alt='Podgląd zdjęcia' />
					</div>
				) : (
					<label htmlFor='image' className='file-upload'>
						<div
							className='cloud-upload'
							onClick={() =>
								document.getElementById("image-uploader")?.click()
							}>
							<IoCloudUploadOutline />
						</div>
					</label>
				)}

				<div className='custom-file-uploader'>
					<Input
						inputClassName='file-input'
						type='file'
						name='image'
						onChange={handleFileChange}
						ref={fileInputRef}
					/>

					<Button className='custom-button-label' onClick={handleClick}>
						Dodaj Zdjęcie
					</Button>
				</div>
			</>
		);
	}
);

export default ImageUploader;
