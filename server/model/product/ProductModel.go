package product;

type Product struct {
  ID string;
  Name string;
  Weight float32;
  X, Y, Z float32;
  Barcode Barcode;
}

func (product *Product) SetWeight(weight float32) {
  product.Weight = weight;
}

func (product *Product) GetVolume() float32 {
  return product.X * product.Y * product.Z;
}

func (product *Product) SampleCallback(name string, callback func(string)) {
  product.Name = name + "_processed";
  callback(product.Name);
}