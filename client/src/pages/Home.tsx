import { ChevronsRight } from "lucide-react";

import {
  Drawer, DrawerBody, DrawerContent, DrawerHeader,
  Button, cn, ScrollShadow, Tooltip, useDisclosure,
} from "@heroui/react";

import { DefaultLayout } from "@components";
import { Resumes } from "@components/resume";
import { Profile } from "@pages";

export default function Home() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <DefaultLayout className="p-2 md:p-4 lg:p-6 xl:p-8" onOpenProfile={onOpen}>
      <ScrollShadow orientation="vertical" className="h-full overflow-visible">
        <div
          className={cn(
            "grid gap-4 mt-4",
            "grid-cols-2",
            "sm:grid-cols-3",
            "md:grid-cols-4",
            "lg:grid-cols-5",
            "xl:grid-cols-6"
          )}
        >
          <Resumes />
        </div>
      </ScrollShadow>

      <Drawer
        size="lg" isDismissable={false} hideCloseButton
        isOpen={isOpen} onOpenChange={onOpenChange}
        classNames={{
          header: "border-b border-divider p-2 flex items-center",
          body: "p-4"
        }}
      >
        <DrawerContent>
          <DrawerHeader>
            <Tooltip content="Dismiss" placement="left">
              <Button isIconOnly size="lg" variant="light" onPress={onClose}>
                <ChevronsRight size={18} />
              </Button>
            </Tooltip>
            <span className="text-lg font-semibold"> Profile </span>
          </DrawerHeader>
          <DrawerBody>
            <ScrollShadow orientation="vertical" className="h-full">
              <Profile />
            </ScrollShadow>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </DefaultLayout>
  );
}