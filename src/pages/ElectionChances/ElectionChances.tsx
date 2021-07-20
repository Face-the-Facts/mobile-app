import { IonContent, IonPage, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import React from 'react';
import className from 'classnames';
import ElectionchancesCard from '../../components/ElectionChancesCard/ElectionChancesCard';
import SegmentButtons from '../../components/SegmentButtons';
import VoteExplainerCard from '../../components/VoteExplainerCard/VoteExplainerCard';
import './ElectionChances.css';
import FirstVotePopup from '../../components/PopupCard/FirstVotePopup/FirstVotePopup';
import SecondVotePopup from '../../components/PopupCard/SecondVotePopup/SecondVotePopup';
import { ElectionResult } from '../../Types';
import { useQuery } from 'react-query';
import { newfetch } from '../../functions/queries';
import { constituencyCardHandler } from '../../functions/constituencyCardHandler';
import { useParams } from 'react-router';
import SecondVoteCard from '../../components/SecondVoteCard';
import MobileScreen from '../../hoc/MobileScreen';
import { NavLink } from 'react-router-dom';

const Electionchances: React.FC = () => {
	/* Here we define the variable 'name' to be used as a parameter in components */
	const [segment, setSegment] = React.useState('0'); // eslint-disable-line @typescript-eslint/no-unused-vars

	const { id } = useParams<{ id: string }>();

	const { data, status } = useQuery(
		`politician-mandate-${id}`,
		() => newfetch(`candidacies-mandates/?politician_id=${id}`),
		{
			staleTime: 60 * 10000000, // 10000 minute = around 1 week
			cacheTime: 60 * 10000000,
		}
	);

	const partyClassName = data?.party.label.toLowerCase().replace(/\s/g, '');
	const stateListClass = className('state', partyClassName);
	let secondVoteCards;
	if (status === 'success') {
		secondVoteCards = data.second_vote.map((StateList: ElectionResult, index: number) => {
			return (
				<NavLink
					id="secondVoteCard-link"
					to={`/politician/${StateList.politician.id}/profile`}
					key={`secondvote-${index}`}
				>
					<SecondVoteCard secondVote={StateList} candidateName={data.politician.label} />
				</NavLink>
			);
		});
	} else {
		secondVoteCards = (
			<div className="no-direct-second">
				<IonCardTitle className="no-direct-title">Nicht auf einer Landesliste</IonCardTitle>
				<IonCardSubtitle className="no-direct-subtitle">
					Kandidat:in ist also nur über die Erststimme wählbar.
				</IonCardSubtitle>
			</div>
		);
	}

	/* This is returned when using this component */
	return (
		<MobileScreen>
			<IonPage>
				<SegmentButtons tab={segment} setTab={setSegment} />
				<IonContent className={segment === '0' ? 'firstVote' : 'secondVote'}>
					{segment === '0' ? (
						<div>
							<VoteExplainerCard vote="Erststimme">
								<FirstVotePopup />
							</VoteExplainerCard>
							{
								// eslint-disable-next-line
								status === 'success' ? (
									<div className="election-chances-firstVote">
										<IonCardSubtitle className="electionresult">
											Wahlergebnis 2017
										</IonCardSubtitle>
										<IonCardTitle className="constituency">
											Wahlkreis -{' '}
											{status === 'success'
												? constituencyCardHandler(
														data?.electoral_data.constituency.label
												)
												: null}
										</IonCardTitle>
									</div>
								) : (
									<div className="no-direct-first">
										<IonCardTitle className="no-direct-title">
											Nicht direkt wählbar
										</IonCardTitle>
										<IonCardSubtitle className="no-direct-subtitle">
											Kandidat:in kann also nur indirekt über die Zweitstimme
											gewählt werden.
										</IonCardSubtitle>
									</div>
								)
							}
						</div>
					) : (
						<div>
							<VoteExplainerCard vote="Zweitstimme">
								<SecondVotePopup />
							</VoteExplainerCard>
							<div className="election-chances-secondVote">
								<IonCardSubtitle className="result-text">
									Über diese Liste kamen 2017
								</IonCardSubtitle>
								<IonCardTitle className="result-total">
									{status === 'success' ? data.results : null} Kandidat:innen in den Bundestag.
								</IonCardTitle>
							</div>
							<div className="secondVote-info-text">
								<IonCardSubtitle className="statelist">
									Landesliste 2021
								</IonCardSubtitle>
								<IonCardTitle className="statelist-title">
									<span className={stateListClass + ' constituencycard'}>
										{status === 'success' ? data.party.label : null}
										{status === 'success' ? data?.electoral_data.electoral_list.label : null}
									</span>
								</IonCardTitle>
							</div>
						</div>
					)}

					<div>
						{segment === '1'
							? secondVoteCards
							: status === 'success'
								? data.first_vote.map(
									(ElectionResults: ElectionResult, index: number) => {
										return (
											<NavLink
												id="electionChancesCard-link"
												to={`/politician/${ElectionResults.politician.id}/profile`}
												key={`electionResults-${index}`}
											>
												<ElectionchancesCard vote={ElectionResults} />
											</NavLink>
										);
									}
								)
								: null}
					</div>
				</IonContent>
			</IonPage>
		</MobileScreen>
	);
};

export default Electionchances;
