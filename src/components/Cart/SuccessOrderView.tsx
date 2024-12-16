export default function SuccessOrderView({
  trackingID,
}: {
  trackingID: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-3xl font-bold">Congratulation!</h1>
      <p className="text-lg text-center">
        Your order has been placed successfully. Here is your tracking ID:
        <span className="text-blue-500 font-bold">{trackingID}</span>
      </p>
    </div>
  );
}
