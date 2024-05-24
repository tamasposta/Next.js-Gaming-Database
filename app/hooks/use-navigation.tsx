"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useNavigation() {
  const [searchText, setSearchText] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (searchText) {
      router.push(`/games/search?query=${searchText}`);
    }
    setSearchText("");
  };

  return { setSearchText, handleSubmit };
}
