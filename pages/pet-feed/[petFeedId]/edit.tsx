export default function EditPetFeedPage() {
  return (
    <div className="container">
      <h1 className="text-5xl font-bold font-lora pt-2 pb-3">Edit Pet Feed</h1>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const { dogWalkId } = context.params;

//   if (typeof dogWalkId !== 'string') {
//     return null;
//   }

//   const dogWalk = await getDogWalk(dogWalkId);
//   return {
//     props: {
//       dogWalkId,
//       dogWalk,
//     },
//   };
// }
