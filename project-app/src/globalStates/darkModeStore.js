import {create} from "zustand"; 

const useSwitchStore = create((set) => {
  // Get switch state from local storage if it exists
  const savedSwitchState = JSON.parse(localStorage.getItem('isSwitchOn'));

  return {
    isSwitchOn: savedSwitchState ?? false, // Use saved state if available, otherwise default to false
    toggleSwitch: () => {
      set((state) => {
        const newState = !state.isSwitchOn;
        localStorage.setItem('isSwitchOn', JSON.stringify(newState)); // Save switch state to local storage
        return { isSwitchOn: newState };
      });
    },
  };
});

export default useSwitchStore;