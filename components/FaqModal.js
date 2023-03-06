import { BaseModal } from "@/components/BaseModal";
import Link from 'next/link';


export const FaqModal = ({ isOpen, handleClose }) => {
    return (
      <BaseModal title="FAQ" isOpen={isOpen} handleClose={handleClose}>
        <p className="text-left py-2 font-bold text-md text-gray-100 dark:text-gray-200">
            What does this do?
        </p>
        <p className="text-left text-md text-gray-100 dark:text-gray-200">
            Given a title, it generates a script involving the characters of the famous sitcom Seinfeld.
        </p>

        <p className="text-left py-2 font-bold text-md text-gray-100 dark:text-gray-200">
            Who made it?
        </p>
        <p className="text-left py-2 font-bold text-md text-gray-100 dark:text-gray-200">
            Soysal Degirmenci (soysald at gmail dot com)
        </p>
      </BaseModal>
    )
};

export default FaqModal;