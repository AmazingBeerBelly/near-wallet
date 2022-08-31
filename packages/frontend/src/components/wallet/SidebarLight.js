import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import CreateCustomNameLightBanner from './CreateCustomNameLightBanner';
import ExploreNativeBanner from './ExploreNativeBanner';

const StyledContainer = styled.div`
    background-color: transparent;
    border-radius: 8px;
    padding-bottom: 30px;
    margin-bottom: 40px;
    height: 435px;

    background: linear-gradient(180deg, #E8FAFF 0%, #D7E0FF 100%);
    border-radius: 8px;
    color: #25272A;

    .dots {
        height: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        .dot {
            width: 8px;
            height: 8px;
            background-color: #D5D4D8;
            border-radius: 50%;
            margin: 0 5px;
            cursor: pointer;
            
            &.active {
                background-color: #8FCDFF;
            }
        }
    }
`;

const StyledBanner = styled.div`
    padding: 16px;
    height: 395px;
`;

export default ({ availableAccounts }) => {
    const [activeComponent, setActiveComponent] = useState('ExploreApps');

    useEffect(() => {
        if (availableAccounts?.length > 0) {
            const numNonImplicitAccounts = availableAccounts.filter((a) => a.length < 64).length;
            setActiveComponent(numNonImplicitAccounts === 0 ? 'CreateCustomName' : 'ExploreApps');
        }
    }, [availableAccounts]);

    return (
        <StyledContainer>
            <StyledBanner>
                {activeComponent === 'ExploreApps' ? <ExploreNativeBanner /> : <CreateCustomNameLightBanner/>}
            </StyledBanner>
            {availableAccounts && (
                <div className='dots'>
                    <div className={`dot ${activeComponent === 'ExploreApps' ? 'active' : ''}`} onClick={() => setActiveComponent('ExploreApps')}></div>
                    <div className={`dot ${activeComponent === 'CreateCustomName' ? 'active' : ''}`} onClick={() => setActiveComponent('CreateCustomName')}></div>
                </div>
            )}
        </StyledContainer>
    );
};
