import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonRow } from '@ionic/react';
import Positioning from './Positioning';
import LinkButton from './LinkButton';
import { iconEnum } from '../enums/icon.enum';

import './PositionCard.css';

interface PostionCardProps {
	candidateId: number;
	title: string;
	answer: string;
}

const PositionCard: React.FC<PostionCardProps> = ({
	candidateId,
	title,
	answer,
}: PostionCardProps) => {
	return (
		<IonCard className="position-card">
			<IonCardHeader>
				<IonGrid>
					<IonRow className="ion-justify-content-center">
						<IonCol size="7">
							<IonCardTitle
								className="position-card-title"
								data-testid="position-card-title"
							>
								{title}
							</IonCardTitle>
						</IonCol>
						<IonCol size="5" className="position-sub-col">
							<div className="position-card-subcontent">
								<Positioning positioning={answer} />
								<LinkButton
									linkTo={`/politician/${candidateId}/position`}
									icon={iconEnum.CHEVRON_FORWARD}
								/>
							</div>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonCardHeader>
		</IonCard>
	);
};

export default PositionCard;
