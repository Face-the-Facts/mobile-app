import React from 'react';
import className from 'classnames';
import './ElectionChancesCard.css';
import {
	IonCard,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonGrid,
	IonCol,
	IonRow,
} from '@ionic/react';
import { ElectionResult } from '../../Types';

interface ContainerProps {
	vote: ElectionResult;
}

const ElectionchancesCard: React.FC<ContainerProps> = ({ vote }: ContainerProps) => {
	/* 
	Internationalisation to keep the code in English but print the national language
	*/

	const partyClassName = vote.party.label.toLowerCase().replace(/\s/g, '');
	const electionChancesCardSubtitleClass = className(
		'election-chances-card-subtitle',
		partyClassName
	);

	return (
		<IonCard className="election-chances-card">
			{/* 
			Card header with Vote name, vote subtitle which holds the type of vote it was and the candidate's vote.
			It's inside a css grid so we can more easily arrange the items.
			*/}
			<IonCardHeader className="election-chances-card-header">
				<IonGrid>
					<IonRow>
						<IonCol size="9">
							<div>
								<IonCardTitle
									className="election-chances-card-title"
									data-testid="election-chances-card-title"
								>
									{vote.politician.label}
								</IonCardTitle>
								<IonCardSubtitle
									className={electionChancesCardSubtitleClass}
									data-testid="election-chances-card-party"
								>
									<span>{vote.party.label}</span>
								</IonCardSubtitle>
							</div>
						</IonCol>
						<IonCol className="percentage" size="3">
							<IonCardTitle
								className="election-chances-card-title"
								data-testid="election-chances-card-percentage"
							>
								{vote.electoral_data.constituency_result} %
							</IonCardTitle>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonCardHeader>
		</IonCard>
	);
};

export default ElectionchancesCard;