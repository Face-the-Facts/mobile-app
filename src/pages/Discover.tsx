import {
	IonInput,
	IonContent,
	IonImg,
	IonModal,
	IonFabButton,
	IonPage,
	IonIcon,
	IonButton,
	IonPopover,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import React, { useState } from "react";
import { useParams } from "react-router";
import CameraView from "../components/CameraView";
import DetectedCandidate from "../components/DetectedCandidate";
import "./Discover.css";

const Discover: React.FC = () => {
	const { name } = useParams<{ name: string }>();
	const [text, setText] = useState<string>();
	const [showCamera, setShowCamera] = useState<boolean>(false);
	const [showPopover, setShowPopover] = useState<boolean>(true);
	return (
		<IonPage>
			<IonContent fullscreen>
				<IonModal isOpen={showCamera} cssClass="my-custom-class">
					<IonFabButton
						className="camera-close-button"
						onClick={() => setShowCamera(false)}
					>
						<IonIcon icon={closeOutline}></IonIcon>
					</IonFabButton>
					<CameraView />
				</IonModal>
				<div
					className="discover-page"
					onClick={() => setShowCamera(true)}
				>
					<div className="camera-icon-background">
						<IonImg
							id="camera-square"
							src="../assets/icon/camera-square.svg"
						></IonImg>
						<IonImg
							id="camera-icon"
							src="../assets/icon/camera-solid.svg"
						></IonImg>
					</div>

					<IonInput
						className="search-bar"
						value={text}
						placeholder="Kandidat:in, PLZ oder Ort suchen"
						disabled={true}
						onIonChange={(e) => setText(e.detail.value!)}
					></IonInput>
					<IonPopover
						isOpen={showPopover}
						cssClass="popover"
						onDidDismiss={(e) => setShowPopover(false)}
						translucent={true}
					>
						<DetectedCandidate name="candidate" />
					</IonPopover>
					<IonButton onClick={() => setShowPopover(true)}>
						Show Popover
					</IonButton>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Discover;
