import { getBook } from "@/actions/getBook";
import EditBookClient from "./EditBookClient";

interface IParams {
  bookId?: any;
}

const page = async ({ params }: { params: IParams }) => {
  const book = await getBook(params.bookId);
  return <EditBookClient book={book} />;
};

export default page;
