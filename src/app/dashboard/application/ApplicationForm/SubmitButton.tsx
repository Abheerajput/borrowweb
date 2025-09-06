import Link from "next/link";

export default function SubmitButton() {
  return (
    <div className="text-right w-full">
      <Link href="/dashboard/application/step2">
         <button
        type="submit" // 👈 isse parent <form> ka onSubmit chalega
        className="bg-[#013E8C] text-white font-semibold min-w-full py-3 rounded-full"
      >
        Continue
      </button>
      </Link>
    </div>
  );
}
