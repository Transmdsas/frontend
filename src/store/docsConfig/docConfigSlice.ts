import { createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
import docsConfigService from '../../services/docsConfigService';
import { DocsConfig } from './types';
import { RootState } from '../index';

