import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../app/lib/auth";

const TransactionDetail = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    name : string | null,
    paid : boolean,
  }[];
}) => {
  const session = getServerSession(authOptions);
  return (
    <div className="w-[90%] min-h-[70vh] rounded-md mx-auto px-10 py-4 bg-white">
      <div className="pt-2 flex flex-col gap-6">
        <h1 className="text-xl border-b pb-4 border-slate-300 text-center">
          All Recent Transaction
        </h1>
        {transactions.map((t) => (
          <div className="flex justify-around border-b pb-2 border-slate-300">
            <div className="text-sm">{t.name?.toUpperCase()}</div>
            <div className="flex flex-col justify-center">
            {t.paid ? "-" : "+"} Rs {t.amount / 100}
            </div>
            <div className="text-slate-600 text-xs">
              {t.time.toDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionDetail;
