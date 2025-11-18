import AddressModel from "@/models/AddressModel";

export default class AddressController {
  updateField(address: AddressModel, field: string, value: string): AddressModel {
    (address as any)[field] = value;
    return { ...address };
  }
}
