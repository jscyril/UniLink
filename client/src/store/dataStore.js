import { create } from "zustand";

import axios from "../api/axios";

const useClubStore = create((set) => ({
  clubs: [],
  setClubs: (data) => set({ clubs: data }),
  fetchClubs: async () => {
    try {
      const response = await axios.get("/");

      set({ clubs: response.data.clubs });
      console.log(response.data.clubs);
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  },
  updateClubMembership: async (userId, clubId) => {
    try {
      const data = {
        userid: userId,
        clubid: clubId,
      };
      const response = await axios.post("/follow", data);
      if (response.data) {
        set((state) => ({
          clubs: state.clubs.map((club) =>
            club.clubid === clubId
              ? {
                  ...club,
                  isMember: response.data.value,
                  userclub: response.data.userclub,
                }
              : club
          ),
        }));
      }
    } catch (error) {
      console.error("Error updating club membership:", error);
    }
  },
}));

export default useClubStore;
