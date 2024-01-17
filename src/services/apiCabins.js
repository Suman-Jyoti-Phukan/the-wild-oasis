import supabase, { supabaseUrl } from "./supabase";

export async function getBookings() {
  const { data, error } = await supabase.from("bookings").select("*");

  if (error) {
    console.log(error);
    throw new Error("Bookings could not be loaded");
  }

  return data;
}

// Function for fetching data
export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);

    throw new Error("Cabins could not be loaded");
  }

  return data;
}

//Function for deleting data
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);

    throw new Error("Cabins could not be deleted");
  }

  return data;
}

//Function for creating cabin and uploading image to storage

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random().toFixed(3)}-${
    newCabin.image.name
  }`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

  // 1. Create Cabins
  let query = supabase.from("cabins");

  // A) Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) Edit

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  //New element out the array it will be in (single())

  //Data is not immeadiately returned , so we use select() to get the data imemadiately (select())

  if (error) {
    console.error(error);

    throw new Error("Cabins could not be created");
  }

  //2. Uploading Image In The Stoage Bucket

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, newCabin.image);

  // 3. Delete cabin if the there was error uploading the image

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(storageError);

    throw new Error("Cabins could not be upload and cabin was not created ");
  }
  return data;
}
