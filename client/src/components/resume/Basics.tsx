import { Plus, Trash } from "lucide-react";
import { Button, Input, Textarea } from "@heroui/react";

import { useBasicsStore } from "@stores";

export default function Basics() {
  const basicsStore = useBasicsStore();
  const basics = useBasicsStore(state => state.store);

  return (
    <div className="space-y-4">
      <p className="text-2xl font-bold"> Basics </p>
      <Input
        label="Name" value={basics.name} size="md" variant="bordered" labelPlacement="outside-top"
        onChange={(e) => basicsStore.update({
          ...basics,
          name: e.target.value
        })}
      />
      <Input
        label="Job Title" value={basics.label} size="md" variant="bordered" labelPlacement="outside-top"
        onChange={(e) => basicsStore.update({
          ...basics,
          label: e.target.value
        })}
      />
      <Input
        label="Image URL" value={basics.image} size="md" variant="bordered" labelPlacement="outside-top"
        onChange={(e) => basicsStore.update({
          ...basics,
          image: e.target.value
        })}
      />
      <Input
        label="Email" value={basics.email} size="md" variant="bordered" labelPlacement="outside-top"
        onChange={(e) => basicsStore.update({
          ...basics,
          email: e.target.value
        })}
      />
      <div className="flex gap-2">
        <Input
          label="Phone" value={basics.phone} size="md" variant="bordered" labelPlacement="outside-top"
          onChange={(e) => basicsStore.update({
            ...basics,
            phone: e.target.value
          })}
        />
        <Input
          label="Website" value={basics.url} size="md" variant="bordered" labelPlacement="outside-top"
          onChange={(e) => basicsStore.update({
            ...basics,
            url: e.target.value
          })}
        />
      </div>
      <Input
        label="Location" value={basics.location} size="md" variant="bordered" labelPlacement="outside-top"
        onChange={(e) => basicsStore.update({
          ...basics,
          location: e.target.value
        })}
      />
      <Textarea
        label="Summary" value={basics.summary} size="md" variant="bordered" labelPlacement="outside-top"
        onChange={(e) => basicsStore.update({
          ...basics,
          summary: e.target.value
        })}
      />

      <Profiles />
      <CustomFields />
    </div>
  )
}

function Profiles() {
  const basicsStore = useBasicsStore();
  const basics = useBasicsStore(state => state.store);

  if (!basics.profiles) return;

  return (
    <div className="space-y-2">
      <p className="font-bold"> Profiles </p>
      {basics.profiles.map((profile, idx) => {
        return (
          <div key={idx} className="flex gap-2">
            <Input
              placeholder="Network" variant="faded"
              value={profile.network} size="sm"
              onChange={(e) => basicsStore.updateProfile(idx, {
                ...profile,
                network: e.target.value,
              })}
            />
            <Input
              placeholder="Username" variant="faded"
              value={profile.username} size="sm"
              onChange={(e) => basicsStore.updateProfile(idx, {
                ...profile,
                username: e.target.value,
              })}
            />
            <Input
              placeholder="URL" variant="faded"
              value={profile.url} size="sm"
              onChange={(e) => basicsStore.updateProfile(idx, {
                ...profile,
                url: e.target.value,
              })}
            />
            <Button
              isIconOnly variant="light" size="sm"
              className="hover:text-danger"
              onPress={() => basicsStore.removeProfile(idx)}
            >
              <Trash size={14} />
            </Button>
          </div>
        )
      })}
      <Button onPress={() => basicsStore.addProfile()} variant="ghost" size="sm">
        <Plus size={18} /> Add a profile
      </Button>
    </div>
  )
}

function CustomFields() {
  const basicsStore = useBasicsStore();
  const basics = useBasicsStore(state => state.store);

  if (!basics.customFields) return;

  const onAddField = () => {
    basicsStore.addCustomField({ key: "", value: "" });
  };

  return (
    <div className="space-y-2">
      <p className="font-bold"> Custom Fields </p>
      {basics.customFields.map((field, idx) => {
        return (
          <div className="flex justify-between gap-2 items-center" key={idx}>
            <Input
              value={field.key} size="sm" variant="underlined" placeholder="Key"
              onChange={(e) => basicsStore.updateCustomField({
                idx: idx,
                key: e.target.value,
                value: field.value
              })}
            />
            <Input
              value={field.value} size="sm" variant="underlined" placeholder="Value"
              onChange={(e) => basicsStore.updateCustomField({
                idx: idx,
                key: field.key,
                value: e.target.value
              })}
            />
            <Button
              isIconOnly variant="light" size="sm"
              className="hover:text-danger"
              onPress={() => basicsStore.removeCustomField(idx)}
            >
              <Trash size={14} />
            </Button>
          </div>
        )
      })}
      <Button onPress={onAddField} variant="ghost" size="sm">
        <Plus size={18} /> Add custom field
      </Button>
    </div>
  )
}