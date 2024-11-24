import { revalidateTag } from "next/cache";

const revalidateTags = (tags: string[]) => {
  tags.forEach((tag) => revalidateTag(tag));
};

export default revalidateTags;
