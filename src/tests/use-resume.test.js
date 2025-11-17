import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useResume } from '../hooks/use-resume';
import axiosInstance from '../api/axios';

vi.mock('../api/axios');

describe('useResume Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
    global.URL.revokeObjectURL = vi.fn();
  });

  it('fetches resume successfully', async () => {
    const mockBase64 = btoa('mock pdf content');
    axiosInstance.get.mockResolvedValueOnce({
      data: { resume: mockBase64 },
    });

    const { result } = renderHook(() => useResume());
    
    let response;
    await act(async () => {
      response = await result.current.fetchResume('123');
    });

    expect(response).toEqual({ url: 'blob:mock-url', filename: 'resume.pdf' });
    expect(result.current.resumeUrl).toBe('blob:mock-url');
    expect(result.current.loading).toBe(false);
  });

  it('handles error when resume not found', async () => {
    axiosInstance.get.mockResolvedValueOnce({
      data: { resume: null },
    });

    const { result } = renderHook(() => useResume());
    
    let response;
    await act(async () => {
      response = await result.current.fetchResume('123');
    });

    expect(response).toBe(null);
    expect(result.current.error).toBe('Resume not found');
  });

  it('cleans up blob URL', async () => {
    const mockBase64 = btoa('mock pdf content');
    axiosInstance.get.mockResolvedValueOnce({
      data: { resume: mockBase64 },
    });

    const { result } = renderHook(() => useResume());
    
    await act(async () => {
      await result.current.fetchResume('123');
    });

    expect(result.current.resumeUrl).toBe('blob:mock-url');

    act(() => {
      result.current.cleanup();
    });

    expect(global.URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
  });
});
