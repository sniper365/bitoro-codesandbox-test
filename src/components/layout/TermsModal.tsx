import React, { FC } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Text, Link, Image } from '@chakra-ui/react';
import { Trans } from 'react-i18next';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  t: (key: string) => string; // Adjust the type of 't' function based on your i18n library
  notShowThirtyDays: boolean;
  handleNotShowThirtyDays: (event: React.ChangeEvent<HTMLInputElement>) => void; // Update the type of handleNotShowThirtyDays
  handleSubmit: () => void;
}

const TermsModal: FC<Props> = ({ isOpen, onClose, onOpen, t, notShowThirtyDays, handleNotShowThirtyDays, handleSubmit }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg='bitoro.1000' rounded={'sm'} m={4}>
        <ModalHeader display={'flex'} justifyContent='flex-start' alignItems={'center'} color={'bitoro.30'}>
          <Image
            boxSize='50px'
            objectFit='scale-down'
            src="/static/images/no_opens.webp"
            alt=""
            pl={-2}
          />
          {t('dashboard:about:termsOfUse')}
        </ModalHeader>
        <ModalBody>
          <Text fontSize="md">
            <Trans
              i18nKey={'dashboard:thirtydaysDisclaimer'}
              components={{
                thirtyLink: <Link href='/terms' textDecoration={'underline'}></Link>
              }}
            />
          </Text>
          <Checkbox pt={4} color={'bitoro.200'} borderColor={'bitoro.200'} size={'sm'} isChecked={notShowThirtyDays} onChange={handleNotShowThirtyDays}>
            {t('dashboard:thirtydaysMessage')}
          </Checkbox>
        </ModalBody>
        <ModalFooter justifyContent={'center'}>
          <Button color={'bitoro.30'} mr={3} onClick={handleSubmit}>
            {t('dashboard:agree')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TermsModal;
