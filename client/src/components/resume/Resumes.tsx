import React from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Plus, Trash } from "lucide-react";
import { format, parseISO } from "date-fns";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button, cn, Spinner, addToast, closeAll, Input, Textarea, useDisclosure,
} from "@heroui/react";

import { useResumeStore } from "@stores";
import { PocketBaseContext } from "@components";

export default function Resumes() {
  const navigate = useNavigate();
  const resumeStore = useResumeStore();
  const { client: pocketBase } = React.useContext(PocketBaseContext);
  const { isOpen, onOpen: onOpenForm, onClose } = useDisclosure();

  const [resumeInfo, setResumeInfo] = React.useState({
    id: "",
    label: "",
    description: "",
  })

  const { data: resumes, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["resumes"],
    queryFn: async () => {
      if (!pocketBase.authStore.isValid) {
        return [];
      }
      const response = await pocketBase.collection("resume").getFullList({
        sort: "-created",
      });
      return response;
    },
    retryDelay: 3000,
    retry: (failureCount, error) => {
      return failureCount < 2;
    },
  });

  const { mutate: createResume, isPending: isCreating } = useMutation({
    mutationKey: ["create-resume"],
    mutationFn: async () => {
      const userId = pocketBase.authStore.record?.id;
      if (!userId) {
        onClose();
        closeAll();
        addToast({ title: "Create failed", description: "Unauthorized", color: "danger" });
        return;
      }
      const post = pocketBase.collection("resume").create({
        label: resumeInfo.label,
        description: resumeInfo.description,
        owner: userId,
      });

      addToast({ title: "Creating...", color: "primary", promise: post });
      const response = await post;
      return response;
    },
    retry: false,
    onSuccess: () => {
      onClose();
      closeAll();
      addToast({ title: "Create successfully", color: "success" });
      refetch();
    },
    onError: (error) => {
      onClose();
      closeAll();
      addToast({ title: "Create failed", description: error.message, color: "danger" });
    }
  });

  const { mutate: updateResume, isPending } = useMutation({
    mutationKey: ["update-resume", resumeInfo.id],
    mutationFn: async () => {
      const post = pocketBase.collection("resume").update(resumeInfo.id, {
        label: resumeInfo.label,
        description: resumeInfo.description,
      });

      addToast({ title: "Saving...", color: "primary", promise: post });
      const response = await post;
      return response;
    },
    retry: false,
    onSuccess: () => {
      onClose();
      closeAll();
      addToast({ title: "Update successfully", color: "success" });
      refetch();
    },
    onError: (error) => {
      onClose();
      closeAll();
      addToast({ title: "Update failed", description: error.message, color: "danger" });
    }
  });

  const { mutate: deleteResume, isPending: isDeleting } = useMutation({
    mutationKey: ["delete-resume", resumeInfo.id],
    mutationFn: async (id: string) => {
      const post = pocketBase.collection("resume").delete(id);

      addToast({ title: "Deleting...", color: "primary", promise: post });
      const response = await post;
      return response;
    },
    retry: false,
    onSuccess: () => {
      onClose();
      closeAll();
      addToast({ title: "Delete successfully", color: "success" });
      refetch();
    },
    onError: (error) => {
      onClose();
      closeAll();
      addToast({ title: "Delete failed", description: error.message, color: "danger" });
    }
  });

  if (isLoading) return (
    <div className="flex flex-col justify-center items-center">
      <Spinner />
    </div>
  );

  if (isError) return (
    <div className="flex flex-col justify-center items-center">
      <span className="text-danger">Error: {error.message}</span>
    </div>
  );

  if (!resumes) return null;

  const onOpen = (id: string) => {
    resumeStore.updateId(id);
    navigate(`/resume/${id}`);
  }

  const onCreate = () => {
    if (!pocketBase.authStore.isValid) {
      addToast({
        title: "Important!",
        description: "Please Sign In to create a resume.",
        hideCloseButton: true,
        classNames: {
          base: cn([
            "border border-l-8 rounded-md",
            "flex flex-col items-start gap-4",
            "border-primary-200 border-l-primary",
            "text-primary-500",
          ]),
          icon: "w-6 h-6 fill-current",
        },
        endContent: (
          <div className="flex self-end gap-2">
            <Button color="primary" variant="solid" onPress={() => { navigate("/sign-in"); closeAll() }}>
              Sign In
            </Button>
            <Button color="primary" variant="bordered" onPress={closeAll}>
              Cancel
            </Button>
          </div>
        ),
        color: "default",
      });
      return;
    }
    setResumeInfo({
      id: "",
      label: "Your Resume",
      description: "Your Resume"
    })
    onOpenForm();
  }

  const resumeTailwindClasses = cn(
    "aspect-3/4",
    "p-2 flex flex-col gap-5 justify-center items-center",
    "rounded-2xl border border-divider",
    "transition-all duration-300 ease-in-out",
    "hover:bg-gray-100 hover:scale-105 active:scale-95 cursor-pointer"
  )

  return (
    <>
      <div className={resumeTailwindClasses} onClick={onCreate}>
        <Plus className="w-10 h-10" />
      </div>
      {resumes.map((resume, idx) => {
        return (
          <div
            key={resume.id}
            className={resumeTailwindClasses}
            onClick={() => onOpen(resume.id)}
          >
            <p className="line-clamp-4 w-full px-2 text-center wrap-break-word text-lg font-semibold">
              {resume.label}
            </p>
            {resume.created && (
              <p className="text-center text-xs text-gray-500">
                {format(parseISO(resume.created), "dd/MM/yyyy HH:mm:ss")}
              </p>
            )}
            <div className="flex gap-2">
              <Button
                variant="bordered" color="primary" isIconOnly onPress={() => {
                  onOpenForm();
                  setResumeInfo({
                    id: resume.id,
                    label: resume.label,
                    description: resume.description,
                  });
                }}
              >
                <Edit size={18} />
              </Button>
              <Button variant="bordered" color="danger" isIconOnly onPress={() => {
                addToast({
                  title: "Warning!",
                  description: "Are you sure you want to delete this resume? This action cannot be undone.",
                  hideCloseButton: true,
                  classNames: {
                    base: cn([
                      "border border-l-8 rounded-md",
                      "flex flex-col items-start gap-4",
                      "border-danger-200 border-l-danger",
                      "text-danger-500",
                    ]),
                    icon: "w-6 h-6 fill-current",
                  },
                  endContent: (
                    <div className="flex self-end gap-2">
                      <Button color="danger" variant="bordered" onPress={() => deleteResume(resume.id)}>
                        Delete
                      </Button>
                      <Button color="primary" variant="bordered" onPress={closeAll}>
                        Cancel
                      </Button>
                    </div>
                  ),
                  color: "default",
                });
              }}>
                <Trash size={18} />
              </Button>
            </div>
          </div>
        );
      })}
      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader> {resumeInfo.id ? "Edit Resume" : "Create Resume"} </ModalHeader>
              <ModalBody>
                <Input
                  label="Label"
                  placeholder="Label"
                  value={resumeInfo.label}
                  onChange={(e) => setResumeInfo({ ...resumeInfo, label: e.target.value })}
                />
                <Textarea
                  label="Description"
                  placeholder="Description"
                  value={resumeInfo.description}
                  onChange={(e) => setResumeInfo({ ...resumeInfo, description: e.target.value })}
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="bordered" onPress={onClose} isLoading={isPending}> Close </Button>
                <Button
                  variant="solid" color="primary"
                  onPress={() => resumeInfo.id ? updateResume() : createResume()}
                  isLoading={isPending}
                >
                  {resumeInfo.id ? "Update" : "Create"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}