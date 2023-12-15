import React, {useEffect, useState}   from 'react';
import ApiClient, {cancelTokenSource} from "../../../../../../../utilities/ApiClient";
import swal                           from "sweetalert";
import {BeatLoader}                   from "react-spinners";
import Box                            from "@material-ui/core/Box";
import {Overwrite}                    from "./Overwrite";

const App = ({profileId}) => {
    const [loading, setLoading]             = useState(true);
    const [cardsPlayed, setCardsPlayed]     = useState(null);
    const [appInstalls, setAppInstalls]     = useState(null);
    const [ltv, setLtv]                     = useState(null);
    const [crowns, setCrowns]               = useState(null);
    const [crownsAccrual, setCrownsAccrual] = useState(null);
    const [vipExpirationDate, setVipExpirationDate] = useState(null);
    
    useEffect(() => {
        setLoading(true);
        
        let cancelSource = cancelTokenSource();
        ApiClient.get('profile/get-overwritten-params', {
            params     : {userId: profileId},
            cancelToken: cancelSource.token
        }).then(({data}) => {
            if (data && data.status) {
                setAppInstalls(data.appInstalls);
                setCardsPlayed(data.cardsPlayed);
                setLtv(data.ltv);
                setCrowns(data.crowns);
                setCrownsAccrual(data.crownsAccrual);
                setVipExpirationDate(data.vipExpiration);
            }
        }).catch((error) => {
            swal("Oops!", "Unable to determine Overwritten Params!", "error");
        }).then(() => {
            setLoading(false);
        });
        
        // Clean up by cancelling the ajax
        return function cleanup() {cancelSource.cancel();};
    }, []);
    
    return <>
        <h3>QA Tools :</h3>
        
        <Box my={5} width={0.5}>
            {
                loading ? <BeatLoader size={25} color={`#5267C9`} loading={true}/> :
                <>
                    <Overwrite profileId={profileId} value={ltv} setValue={setLtv}
                               overwriteEndpoint={`profile/overwrite-ltv`} identifier={`ltv`} title={`LTV`}
                               inputType={`number`} inputProps={{step: 0.05, min: 0, max: 100}}/>
                    <Overwrite profileId={profileId} value={cardsPlayed} setValue={setCardsPlayed}
                               overwriteEndpoint={`profile/overwrite-cards-played`} identifier={`cardsPlayed`}
                               title={`Cards Played`} inputType={`number`} inputProps={{min: 0, max: 999}}/>
                    <Overwrite profileId={profileId} value={appInstalls} setValue={setAppInstalls}
                               overwriteEndpoint={`profile/overwrite-app-installs`} identifier={`appInstalls`}
                               title={`App Installs`} inputType={`number`} inputProps={{min: 0, max: 100}}/>
                    <Overwrite profileId={profileId} value={crowns} setValue={setCrowns}
                               overwriteEndpoint={`profile/overwrite-crowns`} identifier={`crowns`} title={`Crowns`}
                               inputType={`number`} inputProps={{min: 0, max: 9999}}/>
                    <Overwrite profileId={profileId} value={crownsAccrual} setValue={setCrownsAccrual}
                               overwriteEndpoint={`profile/overwrite-crowns-accrual`} identifier={`crownsAccrual`} title={`Crowns Accrual`}
                               inputType={`number`} inputProps={{min: 0, max: 9999}}/>
                    <Overwrite profileId={profileId} value={vipExpirationDate} setValue={setVipExpirationDate}
                               overwriteEndpoint={`profile/overwrite-vip-expiration`} identifier={`vipExpiration`} title={`Vip Expiration Date`}
                               inputType={`datetime-local`} inputProps={{}} inputLabelProps={{shrink:true}}/>
                </>
            }
        </Box>
    </>
};

export default App;
