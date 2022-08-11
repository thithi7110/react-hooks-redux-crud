import React, { useRef, useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addJyuchuInf, getDataById } from "../../actions/jyu/jyua001";
import CustomTextSimple from "../common/CustomTextSimple";
import DataAccessName from "../common/DataAccessName";
import CustomModal from "../common/CustomModal";
import CustomDateSimple from "../common/CustomDateSimple";
import { keyfocuscontrol,formatDateToText } from "../../util/util";