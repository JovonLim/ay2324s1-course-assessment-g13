'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/modal';

import { Button } from '@nextui-org/button';
import { Select, SelectItem } from '@nextui-org/select';
import { Chip } from '@nextui-org/chip';
import { Category, Complexity, Question } from '../types/question';
import { useForm } from 'react-hook-form';
import { notifySuccess} from '../components/notifications';
import { Preference } from '../types/preference';

export default function SetPreferencesModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const categories = Object.values(Category);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data : Preference) => {
    const modifiedData = {
      categories: (data.categories as string).split(',') as Category[],
      complexities: (data.complexities as string).split(',') as Complexity[],
    };
    // TODO: Use the modifiedData for matching
    notifySuccess("Preferences Set!");
    onOpenChange();
    reset();
  });

  return (
    <>
      <Button color="primary" variant="ghost" className="text-lg py-5" onPress={onOpen}>
        Set Preferences
      </Button>
      <Modal
        size={'2xl'}
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange();
          reset();
        }}
        placement="top-center"
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">Set Preferences</ModalHeader>
              <form>
                <ModalBody>
                  <Select
                    {...register('complexities')}
                    label="Complexity"
                    placeholder="Select Preferred Complexities"
                    selectionMode="multiple"
                    variant="bordered"
                    labelPlacement="outside"
                    errorMessage={errors.complexity?.message as string}
                  >
                    {Object.values(Complexity).map(c => (
                      <SelectItem key={c} value={c}>
                        {c.toUpperCase()}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    {...register('categories')}
                    items={categories}
                    label="Category"
                    variant="bordered"
                    labelPlacement="outside"
                    isMultiline
                    selectionMode="multiple"
                    placeholder="Select Preferred Categories"
                    errorMessage={errors.categories?.message as string}
                    renderValue={items => {
                      return (
                        <div className="flex flex-wrap gap-2">
                          {items.map(item => (
                            <Chip key={item.key} variant="bordered">
                              {item.key}
                            </Chip>
                          ))}
                        </div>
                      );
                    }}
                  >
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category.toUpperCase()}
                      </SelectItem>
                    ))}
                  </Select>
                </ModalBody>
              </form>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onClick={() => {
                    onClose();
                    reset();
                  }}
                >
                  Close
                </Button>
                <Button color="primary" onClick={onSubmit}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
