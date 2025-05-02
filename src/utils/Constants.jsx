import React, { useState, useContext } from "react";
import { AiFillHome } from "react-icons/ai";
import { SiYoutubeshorts } from "react-icons/si";
import {
  MdSubscriptions,
  MdOutlineWatchLater,
  MdOutlineShoppingBag,
  MdMovie,
} from "react-icons/md";
import {
  FaHistory,
  FaFire,
  FaMusic,
  FaRegNewspaper,
  FaTrophy,
} from "react-icons/fa";
import { RiPlayList2Fill } from "react-icons/ri";
import { BiLike } from "react-icons/bi";
import { CiStreamOn } from "react-icons/ci";
import { SiYoutubegaming, SiGooglepodcasts } from "react-icons/si";
import { Context } from "../context/contextApi";

export const categories = [
  { id: 1, name: "Home", icon: <AiFillHome />, type: "menu" },
  { id: 2, name: "Shorts", icon: <SiYoutubeshorts />, type: "innerCategory" },
  {
    id: 3,
    name: "Subscription",
    icon: <MdSubscriptions />,
    type: "menu",
    divider: true,
  },
  { id: 4, name: "History", icon: <FaHistory />, type: "menu" },
  {
    id: 5,
    name: "Playlists",
    icon: <RiPlayList2Fill />,
    type: "menu",
  },
  {
    id: 6,
    name: "MyVideos",
    icon: <MdOutlineWatchLater />,
    type: "menu",
  },
  {
    id: 7,
    name: "LikedVideos",
    icon: <BiLike />,
    divider: true,
    type: "menu",
  },
  { id: 8, name: "Trending", icon: <FaFire />, type: "innerCategory" },
  {
    id: 9,
    name: "Shopping",
    icon: <MdOutlineShoppingBag />,
    type: "innerCategory",
  },
  { id: 10, name: "Music", icon: <FaMusic />, type: "innerCategory" },
  { id: 11, name: "Movies", icon: <MdMovie />, type: "innerCategory" },
  { id: 12, name: "Live", icon: <CiStreamOn />, type: "innerCategory" },
  { id: 13, name: "Gaming", icon: <SiYoutubegaming />, type: "innerCategory" },
  { id: 14, name: "News", icon: <FaRegNewspaper />, type: "innerCategory" },
  { id: 15, name: "Sports", icon: <FaTrophy />, type: "innerCategory" },
  {
    id: 16,
    name: "Podcasts",
    icon: <SiGooglepodcasts />,
    type: "innerCategory",
  },
];
