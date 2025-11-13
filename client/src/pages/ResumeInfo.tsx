import React from "react";

import { Plus, Trash } from "lucide-react";
import { Button, Input, Textarea } from "@heroui/react";

import { useBasicsStore } from "@stores";
import { Education, Work } from "@pages/resume";

export default function ResumeInfo() {
  const basicsStore = useBasicsStore();
  const basics = useBasicsStore(state => state.store);

  const onAddField = () => {
    basicsStore.addCustomField({ key: "", value: "" });
  };

  const renderCustomFields = React.useMemo(() => {
    if (!basics.customFields) return;
    return basics.customFields.map((field, idx) => {
      return (
        <div className="flex justify-between gap-2 items-center" key={idx}>
          <Input
            value={field.key} size="sm"
            onChange={(e) => basicsStore.updateCustomField({
              idx: idx,
              key: e.target.value,
              value: field.value
            })}
          />
          <Input
            value={field.value} size="sm"
            onChange={(e) => basicsStore.updateCustomField({
              idx: idx,
              key: field.key,
              value: e.target.value
            })}
          />
          <Button isIconOnly variant="light" size="sm" onPress={() => basicsStore.removeCustomField(idx)}>
            <Trash size={18} />
          </Button>
        </div>
      )
    })
  }, [basics.customFields]);

  return (
    <div className="flex flex-col gap-4">

      <div className="space-y-4">
        <p className="text-2xl font-bold"> Basics </p>
        <Input
          label="Name" value={basics.name} size="sm" variant="bordered" labelPlacement="outside-top"
          onChange={(e) => basicsStore.update({
            ...basics,
            name: e.target.value
          })}
        />
        <Input
          label="Email" value={basics.email} size="sm" variant="bordered" labelPlacement="outside-top"
          onChange={(e) => basicsStore.update({
            ...basics,
            email: e.target.value
          })}
        />
        <Input
          label="Phone" value={basics.phone} size="sm" variant="bordered" labelPlacement="outside-top"
          onChange={(e) => basicsStore.update({
            ...basics,
            phone: e.target.value
          })}
        />
        <Input
          label="Location" value={basics.location} size="sm" variant="bordered" labelPlacement="outside-top"
          onChange={(e) => basicsStore.update({
            ...basics,
            location: e.target.value
          })}
        />
        <Textarea
          label="Summary" value={basics.summary} size="sm" variant="bordered" labelPlacement="outside-top"
          onChange={(e) => basicsStore.update({
            ...basics,
            summary: e.target.value
          })}
        />

        {renderCustomFields}

        <Button
          onPress={onAddField}
          variant="ghost" size="sm"
        >
          <Plus size={18} /> Add a custom field
        </Button>
      </div>

      <Work />
      <Education />

    </div>
  )
}