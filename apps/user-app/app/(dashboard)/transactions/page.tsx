import { getServerSession } from "next-auth";
import TransactionDetail from "../../../components/TransactionDetail";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

async function getP2pTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            OR: [
                { fromUserId: Number(session?.user?.id) }, 
                { toUserId: Number(session?.user?.id) }     
            ]
        },
        include:{
            toUser: true,
            fromUser: true,
        }
    });
    return txns.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        name: t.toUserId == session?.user?.id ? t.fromUser.name : t.toUser.name,
        paid : Number(t.fromUserId) == Number(session?.user?.id)
    }))
  }

export default async function() {
        const transactions = await getP2pTransactions();
    return <div className="w-[100%]">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transaction Details
        </div>
        <TransactionDetail transactions={transactions} />
    </div>
}