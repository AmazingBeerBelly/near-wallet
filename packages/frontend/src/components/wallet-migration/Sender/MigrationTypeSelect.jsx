import React, { useCallback, useState } from 'react';
import { Translate } from 'react-localize-redux';
import styled from 'styled-components';

import IconWallet from '../../../images/wallet-migration/IconWallet';
import classNames from '../../../utils/classNames';
import FormButton from '../../common/FormButton';
import Modal from '../../common/modal/Modal';
import { WALLET_MIGRATION_VIEWS } from '../WalletMigration';


const Container = styled.div`
    padding: 15px 0;
    text-align: center;
    margin: 0 auto;

    @media (max-width: 360px) {
        padding: 0;
    }

    @media (min-width: 500px) {
        padding: 56px 24px 24px;
    }

    .title{
        font-weight: 800;
        font-size: 20px;
        margin-top: 40px;
    }
`;

const TypeOptionsListing = styled.div`
    margin-top: 40px;
`;

const TypeOptionsListingItem = styled.div`
    position: relative;
    background-color: #FAFAFA;
    padding: 14px 16px;
    cursor: pointer;
    text-align: left;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    cursor: pointer;

    &:hover {
        background: #F0F9FF;
    }

    &:before {
        content: '';
        height: 22px;
        width: 22px;
        top: calc((100% - 22px) / 2);
        border: 2px solid #E6E6E6;
        border-radius: 50%;
        position: absolute;
    }

    &.active {
        background-color: #F0F9FF;
        border-left: solid 4px #2B9AF4;

        :before {
            background-color: #2B9AF4;
            border-color: #2B9AF4;
        }

        :after {
            content: '';
            position: absolute;
            transform: rotate(45deg);
            left: 23px;
            top: 19px;
            height: 11px;
            width: 11px;
            background-color: white;
            border-radius: 50%;
            box-shadow: 1px 0px 2px 0px #000005;
        }
    }

    .name {
        font-size: 16px;
        font-weight: 700;
        padding-left: 40px;
        text-align: left;
        color: #3F4045;
    }

    &:not(:first-child) {
        margin-top: 8px;
    }

    svg, img {
        height: 48px;
        width: 48px;
        padding: 8px;
    }
`;

const ButtonsContainer = styled.div`
    text-align: center;
    width: 100% !important;
    display: flex;
    padding: 12px 24px 24px;
    border-top: 1px solid #EDEDED;
`;

const StyledButton = styled(FormButton)`
    width: calc((100% - 16px) / 2);

    &:last-child {
        margin-left: 16px !important;
    }
`;

export const SENDER_MIGRATION_TYPES = {
    MIGRATE_TO_EXTENSION: 'MIGRATE_TO_EXTENSION',
    MIGRATE_WITH_QR_CODE: 'MIGRATE_WITH_QR_CODE',
};

const SENDER_MIGRATION_TYPES_LIST = [
    {
        id: SENDER_MIGRATION_TYPES.MIGRATE_TO_EXTENSION,
        nameId: 'walletMigration.selectSenderMigration.toExtension',
    },
    {
        id: SENDER_MIGRATION_TYPES.MIGRATE_WITH_QR_CODE,
        nameId: 'walletMigration.selectSenderMigration.withQrCode',
    }
];

const MigrationTypeSelect = ({ handleSetActiveView, handleMigrationType, onClose }) => {
    const [migrationType, setMigrationType] = useState(SENDER_MIGRATION_TYPES.MIGRATE_TO_EXTENSION);

    const onContinue = useCallback(() => {
        handleSetActiveView(WALLET_MIGRATION_VIEWS.MIGRATION_SECRET);
        handleMigrationType(migrationType);
    }, [migrationType]);

    return (
        <Modal
            modalClass='slim'
            id='migration-modal'
            isOpen
            disableClose
            onClose={onClose}
            modalSize='md'
            style={{ maxWidth: '496px' }}
        >
            <Container>
                <IconWallet/>
                <h4 className='title'><Translate id='walletMigration.selectSenderMigration.title'/></h4>
                <TypeOptionsListing>
                    {SENDER_MIGRATION_TYPES_LIST.map((typeOption) => {
                        return (
                            <TypeOptionsListingItem
                                className={classNames([{ active: typeOption.id === migrationType }])}
                                onClick={() => setMigrationType(typeOption.id)}
                                key={typeOption.id}
                            >
                                <h4 className='name'><Translate id={typeOption.nameId}/></h4>
                            </TypeOptionsListingItem>
                        );
                    })}
                </TypeOptionsListing>
                <ButtonsContainer>
                    <StyledButton className='gray-blue' onClick={onClose}>
                        <Translate id='button.cancel' />
                    </StyledButton>
                    <StyledButton onClick={onContinue}>
                        <Translate id='button.continue' />
                    </StyledButton>
                </ButtonsContainer>
            </Container>
        </Modal>
    );
};

export default MigrationTypeSelect;