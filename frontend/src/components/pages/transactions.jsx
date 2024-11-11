import { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import Table from "../common/table/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { axiosClient } from "../../axios/instance";
import Spinner from "../common/loader/Spinner";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("hash", {
    header: "HASH",
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("amount", {
    header: "AMOUNT",
    cell: (info) => (
      <span>{info.getValue() !== null ? info.getValue() : "Nil"}</span>
    ),
  }),
  columnHelper.accessor("sender", {
    header: "SENDER",
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("to", {
    header: "TO",
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("blockHeight", {
    header: "BLOCk HEIGHT",
    cell: (info) => <span>{info.getValue()}</span>,
  }),
];

const Transactions = () => {
  const [timer, setTimer] = useState(0);
  const [isTimerComplete, setIsTimerComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeInterval, setTimeInterval] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    let interval;

    if (timer === 0) {
      setIsTimerComplete(true);
      setTimeInterval("");
      return;
    } else {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev - 1 === 0) clearInterval(interval);
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  useEffect(() => {
    if (isTimerComplete && timer === 0) {
      fetchTransactions();
    }
  }, [isTimerComplete, timer]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get("/transactions");
      setLoading(false);
      const formattedTransactions = data?.map((transaction) => ({
        id: transaction.index,
        hash: `${transaction.hash.slice(0, 15)}...`,
        amount: `${transaction.amount}BNB`,
        sender: `${transaction.sender.address.slice(0, 15)}...`,
        to: `${transaction.to.address.slice(0, 15)}...`,
        blockHeight: transaction.block.height,
      }));

      setTransactions(formattedTransactions);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSetInterval = () => {
    const interval = Number(timeInterval) * 60;
    setIsTimerComplete(false);
    setTimer(interval);
  };

  let spinner, transactionsContent;

  if (loading) {
    spinner = <Spinner />;
  } else if (!loading && transactions?.length > 0) {
    transactionsContent = (
      <div className="mt-[50px] w-[95%] mx-auto h-auto">
        <Table data={transactions} columns={columns} />
      </div>
    );
  }

  return (
    <div className="h-screen">
      <Navbar />

      <div className="mx-auto mt-[50px] w-[100%] md:w-[40%] lg:w-[30%] h-auto flex flex-col gap-[25px]">
        {/* font-[RobotoMonoLight] */}
        <h1 className="!text-white text-[60px] m-0 font-[VioletSans]">
          Transactions
        </h1>

        <section className="w-full flex flex-col gap-[20px] flex-1">
          <h2 className="!text-white text-[18px] m-0 font-[RobotoMonoLight]">
            Enter the interval in minutes
          </h2>
          <div className="flex flex-col gap-[15px]">
            <input
              type="number"
              className="h-[40px] w-full mt-[10px] rounded-sm bg-white outline-none border-none"
              value={timeInterval}
              onChange={(e) => setTimeInterval(e.target.value)}
            />
          </div>

          <span className="flex flex-col gap-[10px]">
            <button
              className="clipButton font-[Nippo] w-[130px]"
              onClick={handleSetInterval}
            >
              Set Interval
            </button>

            <p className="!text-white">
              Your transactions will be refreshed in{" "}
              <span className="text-[#02ebb5] mr-[4px]">{timer}</span>seconds
            </p>
          </span>
        </section>

        {spinner}
      </div>
      {transactionsContent}
    </div>
  );
};

export default Transactions;
