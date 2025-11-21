import React from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, LogOut, Pencil } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import { PocketBaseContext } from "@components";
import {
  Button, Form, Input, Tooltip, Avatar,
  Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure,
  addToast
} from "@heroui/react";

export default function Profile() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { client, avatar, signOut } = React.useContext(PocketBaseContext);
  const profile = client.authStore.record;
  const [info, setInfo] = React.useState(profile);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose();
    updateProfile.mutate();
  }

  const updateProfile = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: async () => {
    },
    retry: false,
    onSuccess: () => {
      addToast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
        color: "success",
      });
    },
    onError: (error) => {
      addToast({
        title: "Profile update failed",
        description: error.message,
        color: "danger",
      });
    },
  })

  const onSignIn = () => {
    navigate("/sign-in");
  }

  const onSignOut = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signOut();
    navigate("/");
  }

  if (!client.authStore.isValid || !info) return (
    <div className="p-4 flex flex-col gap-4 items-center justify-start h-full w-full">
      <p className="text-xl font-medium"> You are not signed in </p>
      <Button variant="solid" color="primary" className="w-1/3 space-x-2 text-lg text-white" onPress={onSignIn}>
        <LogIn size={20} />
        <span> Sign In </span>
      </Button>
    </div>
  );

  return (
    <>
      <Form
        onSubmit={onSignOut}
        className="flex flex-col gap-4 items-center justify-between h-full w-full"
      >
        <div className="flex flex-col gap-4 items-center justify-center">
          {info.avatar && (
            <div className="flex gap-4 items-center">
              <Avatar className="w-40 h-40 text-large" src={avatar} />
            </div>
          )}
          <p className="text-2xl font-bold"> {info.name} </p>
          <Tooltip content="Edit">
            <Button size="md" variant="light" isIconOnly className="border border-primary text-primary rounded-full" onPress={onOpen}>
              <Pencil size={20} />
            </Button>
          </Tooltip>
        </div>
        <Button
          variant="flat" color="primary" type="submit"
          className="w-1/3 space-x-2 text-lg"
        >
          <LogOut size={20} />
          <span> Sign Out </span>
        </Button>
      </Form>

      <Modal
        isOpen={isOpen} onOpenChange={onOpenChange}
        classNames={{
          body: "w-full",
          footer: "w-full",
        }}
      >
        <ModalContent>
          <Form onSubmit={onSubmit}>
            <ModalHeader> Edit Profile </ModalHeader>
            <ModalBody>
              <Input
                name="name" label="Name" labelPlacement="outside" variant="bordered"
                value={info.name}
                validate={value => {
                  if (!value) return "Name is required";
                  return true;
                }}
                onChange={(e) => setInfo({ ...info, name: e.target.value })}
              />
              <Input
                name="email" label="Email" labelPlacement="outside" variant="bordered"
                value={info.email}
                validate={value => {
                  if (!value) return "Email is required";
                  return true;
                }}
                onChange={(e) => setInfo({ ...info, email: e.target.value })}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="bordered" color="primary" onPress={onClose} type="button"> Cancel </Button>
              <Button variant="solid" color="primary" type="submit"> Save </Button>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>
    </>
  )
}