export const metadata = {
  title: "Inquiry",
};

import AddDialog from "@/components/custom/addDialog";
import InquiryTable from "@/components/custom/inquiryTable";

const Inquiry = () => {
  return (
    <div>
      <div className="flex items-center justify-between p-5">
        <h2 className="text-2xl font-semibold text-gray-800">Inquiries</h2>
        <AddDialog />
      </div>
      <InquiryTable />
    </div>
  );
};

export default Inquiry;
