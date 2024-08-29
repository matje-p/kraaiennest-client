const profileTable = () => {
  const userDetails = {
    1: { name: "Matthias" },
    2: { name: "Sarah" },
    3: { name: "Anna" },
    4: { name: "Luka" },
  };
  console.log("user details: ", userDetails);
  return (
    <div>
      <tbody>
        {userDetails.map((userDetail: { userId: any }) => (
          <ProfileTableRow key={userDetail.userId} userId={userDetail.userId} />
        ))}
      </tbody>
    </div>
  );
};

export default profileTable;
